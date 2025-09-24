from fastapi import APIRouter, HTTPException, Depends 

from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select 

from schemas.schemas import SensorRegisterSchema
from models.models import Sensor,Device
from database import async_session_local

router = APIRouter(prefix="/sensor", tags=["sensors"])

async def get_db():

    db = async_session_local() 
    try:
        yield db
    finally:
        await db.close()

@router.post("")
async def register_sensor(sensor_registor: SensorRegisterSchema, db : AsyncSession = Depends(get_db)):
# need additional check query
    device_query = select(Device).filter_by(device_id = sensor_registor.device_id)
    query_result = await db.execute(device_query)
    device = query_result.scalars().first()

    if not device:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    sensor_value = [
        {"device_id": sensor_registor.device_id, "sensor_name": sensors_name}
        for sensors_name in sensor_registor.data
    ]
    
    insert_sensor = insert(Sensor).values(sensor_value).on_conflict_do_nothing(index_elements=['device_id', 'sensor_name'])

    await db.execute(insert_sensor)
    await db.commit()
