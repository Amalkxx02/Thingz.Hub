from fastapi import APIRouter, HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.future import select

from app.database import async_session_local
from schemas.schemas import ThingCardAdd
from models.models import ThingzCard

router = APIRouter(prefix=("/thingzCard"), tags=["thingCard"])

async def get_db():
    
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()
    
@router.post("/create")
async def create_thing_card(user_id: str,thing_card: ThingCardAdd, db: AsyncSession = Depends(get_db)):
    query = insert(ThingzCard).values(
    user_id = user_id,
    sensor_id = thing_card.thing_id,
    config = thing_card.thing_config).on_conflict_do_nothing(index_elements=["user_id","sensor_id"]).returning(ThingzCard)
    
    result = await db.execute(query)
    row = result.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="Card already exist")
    
    await db.commit()

    return{"status":"ok"}

@router.get("/retrieve")
async def get_thingz_card(user_id:str,db: AsyncSession = Depends(get_db)):
    query = select(
        ThingzCard
        ).where(
        ThingzCard.user_id == user_id,)
    result = await db.execute(query)
    cards = result.scalars().all()

    return cards