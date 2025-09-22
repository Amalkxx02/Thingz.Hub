from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, UniqueConstraint
from sqlalchemy.sql import func
from database import Base, sync_engine

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

class Device(Base):
    __tablename__ = "devices"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    device_id = Column(String, unique=True, nullable=False)
    api_key = Column(String, nullable=False)

class SensorData(Base):
    __tablename__ = "sensors_data"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    device_id = Column(String, ForeignKey("devices.device_id"), nullable=False)
    data = Column(JSON, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class Sensor(Base):
    __tablename__ = "sensors"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    device_id = Column(String, ForeignKey("devices.device_id"), nullable=False)
    name = Column(String,nullable=False)
    __table_args__ = (
        UniqueConstraint("device_id", "name", name="unique_device_sensor"),
    )
Base.metadata.create_all(sync_engine)