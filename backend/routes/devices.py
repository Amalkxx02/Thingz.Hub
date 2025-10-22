"""
devices.py
----------
Manages user device APIs.

Endpoints:
- POST /api/user/{user_id}/devices
    → Adds a new device entry for a given user.

Notes:
- Important:    Currently, user authentication uses a direct user_id in the path.
                This is **not secure** and should be replaced with JWT-based auth in production.

- Future:   Implement GET endpoint for fetching all user devices.
"""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from uuid import UUID
from schemas.schemas import DeviceAdd
from models.models import Device
from utils.user_utils import user_check
from utils.database_utils import get_db, db_execution

router = APIRouter(prefix="/api/user/{user_id}/devices", tags=["device"])


@router.post(
    "",
    summary="Add a device for a user",
    response_description="Device added confirmation",
)
async def add_device_for_user(
    user_id: UUID, device: DeviceAdd, db: AsyncSession = Depends(get_db)
):
    """
    Add a new device under a specific user.

    Args:
        user_id (UUID): The unique ID of the user.
        device (DeviceAdd): Device data including `device_id` and `device_name`.
        db (AsyncSession): Database session (injected via dependency).

    Raises:
        HTTPException (409): If the user does not exist or the device already exists.

    Returns:
        dict: A success message if the device is added.
    """
    # Verify user existence
    await user_check(user_id, db)

    # Insert device safely (ignore if duplicate)
    query = (
        insert(Device)
        .values(
            user_id=user_id, device_id=device.device_id, device_name=device.device_name
        )
        .on_conflict_do_nothing(index_elements=["device_id"])
        .returning(Device.device_name)
    )

    await db_execution(query, db, message="The device already exists")

    return {"message": "Device added successfully"}
