from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, UniqueConstraint
from sqlalchemy.sql import func
from database import Base, engine

class DevicesTable(Base):
    __tablename__ = "Devices_Table"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    device_MAC = Column(String, unique=True, nullable=False)
    api_key = Column(String, unique=True, nullable=False)
    __table_args__ = (
        UniqueConstraint("device_MAC", "api_key", name="unique_device_api"),
    )

class SensorsDataTable(Base):
    __tablename__ = "Sensors_Data_Table"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    device_MAC = Column(String, ForeignKey("Devices_Table.device_MAC"), nullable=False)
    data = Column(JSON, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class SensorsTable(Base):
    __tablename__ = "Sensors_Table"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    device_MAC = Column(String, ForeignKey("Devices_Table.device_MAC"), nullable=False)
    sensors_name = Column(String,nullable=False)
    __table_args__ = (
        UniqueConstraint("device_MAC", "sensors_name", name="unique_device_sensor"),
    )
Base.metadata.create_all(engine)