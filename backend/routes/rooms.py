from fastapi import APIRouter,HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.future import select

from app.database import async_session_local
from schemas.schemas import RoomAdd
from models.models import Room, User


router = APIRouter(prefix=("/room"), tags=["room"])

async def get_db():
    
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()
    
@router.post("/post")
async def insert_room(user_id: str, room: RoomAdd, db: AsyncSession = Depends(get_db)):

    user = await db.scalar(select(User).where(User.user_id == user_id))
    if not user:
        raise HTTPException(status_code=409, detail="The user not exist")
    
    query = insert(Room).values(
    user_id = user_id,
    room_name = room.room_name,
    room_color = room.room_color).on_conflict_do_nothing(index_elements=["user_id","room_name"]).returning(Room.room_name)
    
    result = await db.execute(query)
    row = result.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="Room already exist")
    
    await db.commit()
    return{"status":"ok"}

@router.get("/get")
async def get_room(user_id: str,db: AsyncSession = Depends(get_db)):
    query = select(Room.room_id,Room.room_name,Room.room_color).where(Room.user_id == user_id)
    result = await db.execute(query)
    rooms = result.all()
    
    return [{"id":r[0], "name":r[1], "color": r[2]} for r in rooms]
