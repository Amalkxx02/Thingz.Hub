from fastapi import APIRouter, HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from uuid import UUID
from schemas.schemas import DeviceAdd
from models.models import Device
from utils.user_utils import user_check
from utils.database_utils import get_db

router = APIRouter(prefix="/api/user/{user_id}/devices", tags=["device"])


@router.post("")
async def add_device_for_user(
    user_id: UUID, device: DeviceAdd, db: AsyncSession = Depends(get_db)
):

    user = await user_check(user_id, db)
    if user is None:
        raise HTTPException(
            status_code=409, detail="The user does not exist. It is a illegal move"
        )

    query = (
        insert(Device)
        .values(
            user_id=user_id, device_id=device.device_id, device_name=device.device_name
        )
        .on_conflict_do_nothing(index_elements=["device_id"])
        .returning(Device.device_name)
    )

    result = await db.execute(query)
    row = result.scalar()

    if row is None:
        raise HTTPException(status_code=409, detail="The device already exist")

    await db.commit()

    return {"message": "Device added successfully"}
