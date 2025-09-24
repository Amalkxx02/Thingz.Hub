from fastapi import APIRouter, HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert

from database import async_session_local
from schemas.schemas import DeviceCardSchema
from models.models import DeviceCard

router = APIRouter(prefix=("/devicecard"), tags=["deviceCard"])

async def get_db():
    
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()
    
@router.post("")
async def insert_device_card(device_card: DeviceCardSchema, db: AsyncSession = Depends(get_db)):
    device_card_entry = insert(DeviceCard).values(
    sensor_id = device_card.sensor_id,
    config = device_card.config).on_conflict_do_nothing(index_elements=["sensor_id"]).returning(DeviceCard.sensor_id)
    
    inserted_device_card = await db.execute(device_card_entry)
    row = inserted_device_card.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="Card already exist")
    else:
        pass
    
    await db.commit()

    return{"status":"ok"}