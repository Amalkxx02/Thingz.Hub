from fastapi import APIRouter,HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert

from database import async_session_local
from schemas.schemas import RoomSchema
from models.models import Room


router = APIRouter(prefix=("/room"), tags=["room"])

async def get_db():
    
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()
    
@router.post("")
async def insert_device_card(room: RoomSchema, db: AsyncSession = Depends(get_db)):
    room_entry = insert(Room).values(
    user_id = room.user_id,
    room_name = room.name,
    color = room.color).on_conflict_do_nothing(index_elements=["user_id"]).returning(Room.user_id)
    
    inserted_room = await db.execute(room_entry)
    row = inserted_room.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="device already exist")
    else:
        pass
    
    await db.commit()

    return{"status":"ok"}