from fastapi import APIRouter, HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, cast, String, desc

from schemas.schemas import SensorRead
from models.models import SensorData, Device, Sensor
from app.database import async_session_local

router = APIRouter(prefix="/sensorData", tags=["sensors"])


async def get_db():

    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()


@router.post("/fromesp")
async def insert_sensor_data(
    sensor_data: SensorRead, db: AsyncSession = Depends(get_db)
):
    # need to improve verification
    query = select(Device).filter_by(device_id=sensor_data.device_id)
    query_result = await db.execute(query)
    device = query_result.scalars().first()

    if not device:
        raise HTTPException(status_code=401, detail="Unauthorized")

    sensor_data_entry = SensorData(
        device_id=sensor_data.device_id, data=sensor_data.data
    )
    db.add(sensor_data_entry)
    await db.commit()

    print(f"Received data from {sensor_data.device_id}: {sensor_data.data}")
    return {"status": "ok"}


@router.get("/retrieve")
async def get_sensor_data(user_Id: str, db: AsyncSession = Depends(get_db)):

    query = (
        select(
            Sensor.sensor_id.label("sensor_id"),
            cast(SensorData.data[Sensor.sensor_name],String).label("value"),
        ).order_by(desc(SensorData.timestamp)).join(SensorData, Sensor.device_id == SensorData.device_id)
    ).where(Sensor.user_id == user_Id)

    result = await db.execute(query)
    sensors = result.mappings().all()
    return [dict(s) for s in sensors]
