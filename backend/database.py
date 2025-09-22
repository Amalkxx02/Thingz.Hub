from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine

async_database_url = "postgresql+asyncpg://iot_user:1234@localhost/iot_dashboard"
async_engine = create_async_engine(async_database_url)

sync_database_url = "postgresql+psycopg2://iot_user:1234@localhost/iot_dashboard"
sync_engine = create_engine(sync_database_url)

async_session_local = sessionmaker(async_engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()