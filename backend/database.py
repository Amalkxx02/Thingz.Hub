from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine

DataBase_URL = "postgresql+asyncpg://iot_user:1234@localhost/iot_dashboard"
asyncEngine = create_async_engine(DataBase_URL)
syncDataBase_URL = "postgresql+psycopg2://iot_user:1234@localhost/iot_dashboard"
syncEngine = create_engine(syncDataBase_URL)
SessionLocal = sessionmaker(asyncEngine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()