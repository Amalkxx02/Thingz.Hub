from fastapi import APIRouter, HTTPException, Depends

from sqlalchemy.dialects.postgresql import insert, JSONB
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func

from schemas.schemas import SensorAdd
from models.models import Sensor, Device
from app.database import async_session_local

router = APIRouter(prefix="/sensors", tags=["sensors"])


async def get_db():

    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()


@router.post("/post")
async def insert_sensor(sensor_add: SensorAdd, db: AsyncSession = Depends(get_db)):
    # need additional check query
    query = select(Device).where(Device.device_id == sensor_add.device_id)
    result = await db.execute(query)
    device = result.scalars().first()
    if not device:
        raise HTTPException(status_code=401, detail="Unauthorized")

    sensor_value = [
        {
            "user_id": device.user_id,
            "device_id": sensor_add.device_id,
            "sensor_name": sensors_name,
        }
        for sensors_name in sensor_add.data
    ]

    insert_sensor = (
        insert(Sensor)
        .values(sensor_value)
        .on_conflict_do_nothing(index_elements=["user_id", "device_id", "sensor_name"])
    )

    await db.execute(insert_sensor)
    await db.commit()


@router.get("/list")
async def get_sensor(user_id: str, db: AsyncSession = Depends(get_db)):
    query = (
        select(
            Device.device_name,
            func.json_agg(
                func.json_build_object(
                    "sensor_name", Sensor.sensor_name, "sensor_id", Sensor.sensor_id
                )
            ).label("sensors"),
        )
        .join(Device)
        .where(Device.user_id == user_id)
        .group_by(Device.device_id)
    )

    result = await db.execute(query)
    row = result.all()

    json_list = await row_to_json(row)

    return json_list


async def row_to_json(row):
    json_list = [
        {"device_name": device_name, "sensors": sensor_list}
        for device_name, sensor_list in row
    ]

    return json_list
