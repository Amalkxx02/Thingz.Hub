from fastapi import APIRouter, HTTPException, Depends 

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select 

from schemas.schemas import SensorReadSchema
from models.models import SensorData,Device
from database import async_session_local

router = APIRouter(prefix="/sensorData", tags=["sensors"])

async def get_db():

    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()

@router.post("")

async def insert_sensor_data(sensor_data: SensorReadSchema, db : AsyncSession = Depends(get_db)):
    # need to improve verification
    device_query = select(Device).filter_by(device_id = sensor_data.device_id)
    query_result = await db.execute(device_query)
    device = query_result.scalars().first()

    if not device:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    sensor_data_entry = SensorData(device_id=sensor_data.device_id, data = sensor_data.data)
    db.add(sensor_data_entry)
    await db.commit()         

    print(f"Received data from {sensor_data.device_id}: {sensor_data.data}")
    return {"status": "ok"}

@router.get("/get")
async def get_sensor_data(db: AsyncSession = Depends(get_db)):
    sensor_query = select(SensorData.id,SensorData.data)
    query_result = await db.execute(sensor_query)
    sensors = query_result.all()
    return[{"id": r[0],"data":r[1]} for r in sensors]