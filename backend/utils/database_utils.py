from fastapi import HTTPException
from app.database import async_session_local


async def get_db():
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()


async def db_execution(query, db, error_message):
    try:
        result = await db.execute(query)
        row = result.scalar()
        if row is None:
            raise HTTPException(status_code=409, detail=error_message)
        await db.commit()
        return row
    except:
        await db.rollback()
        raise HTTPException(
            status_code=404, detail="Internal database issue retry after some time"
        )
