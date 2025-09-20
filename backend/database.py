from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DataBase_URL = "postgresql://iot_user:1234@localhost/iot_dashboard"
engine = create_engine(DataBase_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()