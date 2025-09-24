from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from database import Base, sync_engine

class User(Base):
    __tablename__ = "users"
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

class Room(Base):
    __tablename__ = "rooms"
    room_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    room_name = Column(String, nullable=False)
    # room config
    color = Column(String, nullable=False)

class DeviceRoom(Base):
    __tablename__ = "device_rooms"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    sensor_id = Column(UUID(as_uuid=True), ForeignKey("sensors.sensor_id", ondelete="CASCADE"), nullable=False)
    room_id = Column(Integer, ForeignKey("rooms.room_id", ondelete="CASCADE"), nullable=False)
    __table_args__ = (
    UniqueConstraint("sensor_id","room_id"),
    )

class DeviceCard(Base):
    __tablename__ = "devices_card_config"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    sensor_id = Column(UUID(as_uuid=True), ForeignKey("sensors.sensor_id", ondelete="CASCADE"), nullable=False)
    config = Column(JSON)

class Device(Base):
    __tablename__ = "devices"
    device_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)

class SensorData(Base):
    __tablename__ = "sensors_data"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    device_id = Column(UUID(as_uuid=True), ForeignKey("devices.device_id", ondelete="CASCADE"), nullable=False)
    data = Column(JSON, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class Sensor(Base):
    __tablename__ = "sensors"
    sensor_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    device_id = Column(UUID(as_uuid=True), ForeignKey("devices.device_id", ondelete="CASCADE"), nullable=False)
    sensor_name = Column(String,nullable=False)
    __table_args__ = (
        UniqueConstraint("device_id", "sensor_name", name="unique_device_sensor"),
    )
Base.metadata.create_all(sync_engine)