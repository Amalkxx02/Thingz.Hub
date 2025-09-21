from fastapi import APIRouter,HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import SessionLocal
from schemas.schemas import UsersData
from models.models import UserTable

router = APIRouter(prefix= "/usersauth", tags=["usersauth"])

async def get_datab():
    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()

@router.post("")
async def user_authentication(user_data: UsersData, db: AsyncSession = Depends(get_datab)):
    statement = select(UserTable).filter_by(user_email = user_data.user_email)
    result = await db.execute(statement)
    user = result.scalars().first()
    if user:
        raise HTTPException(status_code=401, detail="User already exist")
    usersDataEntry = UserTable(user_name = user_data.user_name,user_email = user_data.user_email,user_password = user_data.user_password)
    db.add(usersDataEntry)
    await db.commit()
    return{"status":"ok"}