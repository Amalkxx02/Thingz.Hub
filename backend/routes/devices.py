from fastapi import APIRouter,HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.future import select

from app.database import async_session_local
from schemas.schemas import DeviceAdd
from models.models import Device,User

router = APIRouter(prefix= "/device", tags=["device"])

async def get_db():
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()

@router.post("/post")
async def register_user(user_id: str, device: DeviceAdd, db: AsyncSession = Depends(get_db)):

    user = await db.scalar(select(User).where(User.user_id == user_id))
    if not user:
        raise HTTPException(status_code=409, detail="The user not exist")

    query = insert(Device).values(
        device_id = device.device_id,
        user_id = user_id,
        device_name = device.device_name).on_conflict_do_nothing(index_elements=["device_id"]).returning(Device.device_id)
    
    result= await db.execute(query)
    row = result.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="device already exist")
    
    await db.commit()
    return{"status":"ok"}