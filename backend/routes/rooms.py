from fastapi import APIRouter,HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.future import select

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
    
@router.post("/post")
async def insert_room(room: RoomSchema, db: AsyncSession = Depends(get_db)):
    room_entry = insert(Room).values(
    user_id = room.user_id,
    room_name = room.name,
    color = room.color).on_conflict_do_nothing(index_elements=["room_name"]).returning(Room.room_name)
    
    inserted_room = await db.execute(room_entry)
    row = inserted_room.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="Room already exist")
    else:
        pass
    await db.commit()
    return{"status":"ok"}

@router.get("/get")
async def get_room(db: AsyncSession = Depends(get_db)):
    room_retrieve = select(Room.room_id,Room.room_name,Room.color)
    result = await db.execute(room_retrieve)
    rooms = result.all()
    return [{"id":r[0], "name":r[1], "color": r[2]} for r in rooms]
