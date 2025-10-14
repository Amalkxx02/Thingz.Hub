from fastapi import APIRouter, HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import select
from uuid import UUID

from app.database import async_session_local
from schemas.schemas import ThingCardAdd
from models.models import UserThingCard
from utils.user_utils import user_check
from utils.database_utils import get_db

router = APIRouter(
    prefix=("/api/user/{user_id}/userThingzCards"), tags=["UserThingCard"]
)


@router.post("")
async def add_thing_card_for_user(
    user_id: UUID, thing_card: ThingCardAdd, db: AsyncSession = Depends(get_db)
):
    user = await user_check(user_id, db)

    if user is None:
        raise HTTPException(
            status_code=409, detail="The user does not exist. It is a illegal move"
        )

    query = (
        insert(UserThingCard)
        .values(
            user_id=user_id,
            thing_id=thing_card.thing_id,
            config=thing_card.thing_config,
        )
        .on_conflict_do_nothing(index_elements=["user_id", "thing_id"])
        .returning(UserThingCard)
    )

    result = await db.execute(query)
    row = result.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="The card already exist")

    await db.commit()

    return {"status": "ok"}


@router.get("")
async def get_thing_card_for_user(user_id: UUID, db: AsyncSession = Depends(get_db)):

    user = await user_check(user_id, db)

    if user is None:
        raise HTTPException(
            status_code=409, detail="The user does not exist. It is a illegal move"
        )

    query = select(UserThingCard.thing_id,UserThingCard.config).where(
        UserThingCard.user_id == user_id,
    )
    result = await db.execute(query)
    rows = result.mappings().all()

    if not rows:
        return {"message": "No cards yet"}

    return rows
