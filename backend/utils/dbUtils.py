from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.future import select

from models.models import User

async def insert_user(user_data, db):

    query = insert(User).values(
        user_name = user_data["user_name"],
        user_email = (user_data["user_email"]).lower(),
        user_password = user_data["user_password"])
    
    await db.execute(query)
    await db.commit()

async def user_check(user_data, db):

    query = select(User).where(User.user_email == user_data.email.lower())
    result = await db.execute(query)
    user = result.scalars().first()

    return user