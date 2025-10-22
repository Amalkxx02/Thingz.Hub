from sqlalchemy import select

from models.models import Device


async def device_check(device_id, db):
    query = await db.scalar(
        select(Device).where(Device.device_id == device_id)
    )
    return query
