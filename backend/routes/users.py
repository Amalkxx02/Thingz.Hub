from fastapi import APIRouter,HTTPException, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert

from database import async_session_local
from schemas.schemas import UserSchema
from models.models import User

router = APIRouter(prefix= "/usersauth", tags=["usersauth"])

async def get_db():
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()

@router.post("")
async def register_user(user_data: UserSchema, db: AsyncSession = Depends(get_db)):

    user_entry = insert(User).values(
        name = user_data.name,
        email = user_data.email,
        password = user_data.password).on_conflict_do_nothing(index_elements=["email"]).returning(User.email)
    
    inserted_user = await db.execute(user_entry)
    row = inserted_user.fetchone()

    if row is None:
        raise HTTPException(status_code=409, detail="User already exist")
    else:
        print(f"created account for {row.email}")
    
    await db.commit()

    return{"status":"ok"}