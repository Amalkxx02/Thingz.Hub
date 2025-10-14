from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timedelta

from sqlalchemy.ext.asyncio import AsyncSession

from schemas.schemas import UserSignUp, UserSignIn

from utils.user_utils import user_verify, insert_user
from utils.password_utils import password_hashing, password_check
from utils.database_utils import get_db

import uuid

router = APIRouter(prefix="/api/auth", tags=["user"])


pending_user = {}


@router.post("/signup")
async def signup_user(user_data: UserSignUp, db: AsyncSession = Depends(get_db)):
    hashed_pwd = password_hashing(user_data.user_password)

    user = await user_verify(user_data.user_email, db)

    if user is None:
        raise HTTPException(status_code=401, detail="Email already exists")

    token = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(minutes=5)

    pending_user[token] = {
        "user_name": user_data.user_name,
        "user_email": user_data.user_email.lower(),
        "user_password": hashed_pwd,
        "expires_at": expires_at,
    }

    print(
        f"Verification link: http://localhost:8000/api/auth/verify_email?token={token}"
    )

    return {"status": 200, "message": "Verification link sended to your Email address"}


@router.get("/verify_email")
async def email_verification(token: str, db: AsyncSession = Depends(get_db)):
    pending = pending_user.get(token)
    if not pending:
        raise HTTPException(status_code=400, detail="Invalid or Expired token")

    if pending["expires_at"] < datetime.utcnow():
        del pending_user[token]
        raise HTTPException(status_code=400, detail="Token Expired")

    await insert_user(pending, db)

    del pending_user[token]

    return {"message": "Email verified. Account created."}


@router.post("/signin")
async def signin_user(user_data: UserSignIn, db: AsyncSession = Depends(get_db)):

    user = await user_verify(user_data.user_email, db)
    if user is None:
        raise HTTPException(status_code=401, detail="Email or Password does't match")

    pwd_check = password_check(user.user_password, user_data.user_password)
    if not pwd_check:
        raise HTTPException(status_code=401, detail="Email or Password does't match")

    return {"user_id": user.user_id}
