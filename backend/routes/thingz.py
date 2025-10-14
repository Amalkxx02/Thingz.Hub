from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import select, func, case
from uuid import UUID

from models.models import User, Device, Thing
from schemas.schemas import ThingAdd, Sensor, Actuator
from utils.user_utils import user_check
from utils.database_utils import get_db

router = APIRouter(prefix="/api/thingz", tags=["thing"])


@router.post("/{device_id}")
async def add_thing_for_user(
    device_id: UUID, thing: ThingAdd, db: AsyncSession = (Depends(get_db))
):

    device = await db.scalar(
        select(Device.device_id).where(Device.device_id == device_id)
    )

    if device is None:
        raise HTTPException(status_code=400, detail="The Device does not exist")

    values = []

    for items in thing.thingz:

        if isinstance(items, Sensor):
            for sensor_dict in items.sensors:
                values.append(
                    {
                        "device_id": device_id,
                        "thing_type": "sensor",
                        "thing_name": sensor_dict.sensor_name,
                    }
                )

        elif isinstance(items, Actuator):
            for actuator_dict in items.actuators:
                values.append(
                    {
                        "device_id": device_id,
                        "thing_type": "actuator",
                        "thing_name": actuator_dict.actuator_name,
                    }
                )

    query = (
        insert(Thing)
        .values(values)
        .on_conflict_do_nothing(index_elements=["device_id", "thing_name"])
        .returning(Thing)
    )

    result = await db.execute(query)
    thing_row = result.fetchone()

    if thing_row is None:
        raise HTTPException(status_code=409, detail="The device already registered")

    await db.commit()
    return {"status": "ok"}


@router.get("/{user_id}")
async def list_thing_for_user(user_id: UUID, db: AsyncSession = (Depends(get_db))):

    user = await user_check(user_id, db)

    if user is None:
        raise HTTPException(
            status_code=409, detail="The user does not exist. It is a illegal move"
        )

    query = (
        select(
            Device.device_name,
            func.json_build_object(
                "sensors",
                func.json_agg(
                    func.json_build_object(
                        "thing_id",
                        Thing.thing_id,
                        "thing_name",
                        Thing.thing_name,
                    )
                ).filter(Thing.thing_type == "sensor"),
                "actuators",
                func.json_agg(
                    func.json_build_object(
                        "thing_id",
                        Thing.thing_id,
                        "thing_name",
                        Thing.thing_name,
                    )
                ).filter(Thing.thing_type == "actuator"),
            ).label("thingz"),
        )
        .group_by(Device.device_name)
        .join(Thing, Thing.device_id == Device.device_id)
        .where(Device.user_id == user_id)
    )
    result = await db.execute(query)
    rows = result.mappings().all()
    if not rows:
        return {"message": "No sensors yet"}
    return rows
