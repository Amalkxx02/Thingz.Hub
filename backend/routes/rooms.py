from fastapi import APIRouter, HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.future import select
from uuid import UUID
import json

from app.database import async_session_local
from schemas.schemas import RoomAdd
from models.models import Room
from utils.user_utils import user_check
from utils.database_utils import get_db

router = APIRouter(prefix=("/api/user/{user_id}/rooms"), tags=["room"])


@router.post("")
async def add_room_for_user(
    user_id: UUID, room: RoomAdd, db: AsyncSession = Depends(get_db)
):

    user = await user_check(user_id, db)
    if user is None:
        raise HTTPException(
            status_code=409, detail="The user does not exist. It is a illegal move"
        )

    query = (
        insert(Room)
        .values(user_id=user_id, room_name=room.room_name, room_color=room.room_color)
        .on_conflict_do_nothing(index_elements=["user_id", "room_name"])
        .returning(Room.room_name)
    )

    result = await db.execute(query)
    row = result.scalar()

    if row is None:
        raise HTTPException(status_code=409, detail="The room already exist")

    await db.commit()

    return {"message": "Room added successfully"}


@router.get("")
async def get_room_for_user(user_id: UUID, db: AsyncSession = Depends(get_db)):

    user = await user_check(user_id, db)
    if user is None:
        raise HTTPException(
            status_code=409, detail="The user does not exist. It is a illegal move"
        )
    
    query = select(Room.room_id, Room.room_name, Room.room_color).where(
        Room.user_id == user_id
    )
    result = await db.execute(query)
    rows = result.mappings().all()
    if rows is None:
        return {"message": "No rooms yet"}
    return rows
