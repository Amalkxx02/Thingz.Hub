from app.database import async_session_local

async def get_db():
    db = async_session_local()
    try:
        yield db
    finally:
        await db.close()