from sqlalchemy import Column, Integer, String, Boolean, LargeBinary, DateTime, ForeignKey, JSON, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base,relationship
from sqlalchemy.sql import func
import uuid

sync_database_url = "postgresql+psycopg2://iot_admin:1234@localhost/iot_dashboard"
sync_engine = create_engine(sync_database_url)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_name = Column(String, nullable=False)
    user_email = Column(String, unique=True, nullable=False)
    user_password = Column(LargeBinary, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    rooms = relationship("Room",back_populates="user")
    devices = relationship("Device",back_populates="user")
    sensors = relationship("Sensor",back_populates="user")
    thingz_cards = relationship("ThingzCard",back_populates="user")

class Room(Base):
    __tablename__ = "rooms"
    room_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    room_name = Column(String, nullable=False)
    room_color = Column(String, nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "room_name", name="unique_user_id_room_name"),)

    user = relationship("User",back_populates="rooms")

class Device(Base):
    __tablename__ = "devices"
    device_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    device_name = Column(String,nullable=False)

    user = relationship("User",back_populates="devices")
    sensors = relationship("Sensor",back_populates="device")


class ThingzCard(Base):
    __tablename__ = "thingz_card"
    card_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    sensor_id = Column(Integer, ForeignKey("sensors.sensor_id", ondelete="CASCADE"), nullable=False)
    config = Column(JSON)
    __table_args__ = (
        UniqueConstraint("user_id","sensor_id", name="unique_user_id_sensor_id"),)

    user = relationship("User",back_populates="thingz_cards")
    sensor = relationship("Sensor",back_populates="thingz_card")

class Sensor(Base):
    __tablename__ = "sensors"
    sensor_id = Column(Integer, primary_key=True,autoincrement=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    device_id = Column(UUID(as_uuid=True), ForeignKey("devices.device_id", ondelete="CASCADE"), nullable=False)
    sensor_name = Column(String,nullable=False)
    __table_args__ = (
        UniqueConstraint("user_id","device_id", "sensor_name", name="unique_user_device_sensor"),)
    
    thingz_card = relationship("ThingzCard",back_populates="sensor")
    user = relationship("User",back_populates="sensors")
    device = relationship("Device",back_populates="sensors")

class SensorData(Base):
    __tablename__ = "sensors_data"
    data_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    device_id = Column(UUID(as_uuid=True), ForeignKey("devices.device_id", ondelete="CASCADE"), nullable=False)
    data = Column(JSON, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
Base.metadata.create_all(sync_engine)