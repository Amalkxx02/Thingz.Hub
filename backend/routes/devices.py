from fastapi import APIRouter,HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert

from schemas.schemas import DeviceSchema
from models.models import Device
from database import async_session_local

router = APIRouter(prefix="/devices", tags=["device"])

async def get_db():
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()

@router.post("")
async def register_device(device: DeviceSchema, db: AsyncSession = Depends(get_db)):

    device_entry = insert(Device).values(
        device_id = device.device_id,
        api_key = device.api_key
        ).on_conflict_do_nothing(index_elements=["device_id"]).returning(Device.device_id)
    
    inserted_device = await db.execute(device_entry)
    row = inserted_device.fetchone()
    if row is None:
        raise HTTPException(status_code=409, detail="Device already exists")
    else:
        await db.commit()
        print(f"Device {row.device_id} added Sucessfully")