from fastapi import APIRouter,HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert

from database import async_session_local
from schemas.schemas import DeviceCreateSchema
from models.models import Device

router = APIRouter(prefix= "/device", tags=["device"])

async def get_db():
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()

@router.post("")
async def register_user(device: DeviceCreateSchema, db: AsyncSession = Depends(get_db)):

    device_entry = insert(Device).values(
        device_id = device.device_id,
        user_id = device.user_id,).on_conflict_do_nothing(index_elements=["device_id"]).returning(Device.device_id)
    
    inserted_device= await db.execute(device_entry)
    row = inserted_device.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="device already exist")
    else:
        pass
    
    await db.commit()

    return{"status":"ok"}