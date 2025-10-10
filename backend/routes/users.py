from fastapi import APIRouter,HTTPException, Depends
from datetime import datetime, timedelta

from sqlalchemy.ext.asyncio import AsyncSession

from app.database import async_session_local
from schemas.schemas import UserSignUp,UserSignIn

from utils.dbUtils import user_check,insert_user
from utils.pwdUtils import password_hashing,password_check

import uuid

router = APIRouter(prefix= "/auth", tags=["user"])

async def get_db():
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()

pending_user={}

@router.post("/signup")
async def signup_user(user_data: UserSignUp, db: AsyncSession = Depends(get_db)):
    hashed_pwd = password_hashing(user_data.password)

    user = await user_check(user_data,db)

    if user:
        raise HTTPException(status_code=401, detail="Email already exists")
    
    token = str(uuid.uuid4())
    expires_at =  datetime.utcnow()+timedelta(minutes=5)

    pending_user[token]={
        "user_name":user_data.username,
        "user_email":user_data.email.lower(),
        "user_password":hashed_pwd,
        "expires_at":expires_at
    }

    print(f"Verification link: http://localhost:8000/auth/verify_email?token={token}")

    return {"status":200,"message":"Verification link sended to your Email address"}

@router.get("/verify_email")
async def email_verification(token: str, db: AsyncSession = Depends(get_db)):
    pending = pending_user.get(token)
    if not pending:
        raise HTTPException(status_code=400, detail="Invalid or Expired token")
    
    if pending["expires_at"] < datetime.utcnow():
        del pending_user[token]
        raise HTTPException(status_code=400, detail="Token Expired")
    
    await insert_user(pending,db)

    del pending_user[token]

    return {"status": "ok", "message": "Email verified. Account created."}

@router.post("/signin")
async def signin_user(user_data: UserSignIn, db: AsyncSession = Depends(get_db)):

    user = await user_check(user_data,db)
    if not user:
        raise HTTPException(status_code=401, detail="Email or Password does't match")
    
    pwd_check = password_check(user.user_password,user_data.password)
    if not pwd_check:
        raise HTTPException(status_code=401, detail="Email or Password does't match")
    
    return{"status":"ok","user_id":user.user_id}

