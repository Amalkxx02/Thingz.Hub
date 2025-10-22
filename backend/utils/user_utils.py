from sqlalchemy import select, func
from fastapi import HTTPException

from models.models import User


async def insert_user(user_data, db):

    query = User(
        user_name=user_data["user_name"],
        user_email= func.lower(user_data["user_email"]),
        user_password=user_data["user_password"],
    )

    db.add(query)

    await db.commit()


async def user_verify(user_email, db):
    query = await db.scalar(select(User).where(func.lower(User.user_email) == func.lower(user_email)))
    return query

async def user_check(user_id,db):
    query = await db.scalar(select(User).where(User.user_id == user_id))
    if query is None:
        raise HTTPException(
            status_code=409, detail="The user does not exist. This is an illegal move."
        )
    return query