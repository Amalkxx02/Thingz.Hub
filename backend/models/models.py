from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    LargeBinary,
    DateTime,
    ForeignKey,
    JSON,
    UniqueConstraint,
    CheckConstraint,
)
from sqlalchemy import create_engine

from sqlalchemy.orm import declarative_base, relationship

from sqlalchemy.sql import func

from sqlalchemy.dialects.postgresql import UUID
import uuid

sync_database_url = "postgresql+psycopg2://iot_admin:1234@localhost/iot_dashboard"
sync_engine = create_engine(sync_database_url)
Base = declarative_base()


class User(Base):
    __tablename__ = "Users"
    user_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
        index=True,
    )
    user_name = Column(String, nullable=False)
    user_email = Column(String, unique=True, nullable=False)
    user_password = Column(LargeBinary, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    devices = relationship("Device", back_populates="user")
    rooms = relationship("Room", back_populates="user")
    user_thingz_cards = relationship("UserThingCard", back_populates="user")


class Device(Base):
    __tablename__ = "Devices"
    device_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
        index=True,
    )
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("Users.user_id", ondelete="CASCADE"),
        nullable=False,
    )
    device_name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    thingz = relationship("Thing", back_populates="device")
    user = relationship("User", back_populates="devices")


class Thing(Base):
    __tablename__ = "Thingz"
    thing_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    device_id = Column(
        UUID(as_uuid=True),
        ForeignKey("Devices.device_id", ondelete="CASCADE"),
        nullable=False,
    )
    thing_type = Column(String, nullable=False)
    thing_name = Column(String, nullable=False)

    device = relationship("Device", back_populates="thingz")
    user_thing_card = relationship("UserThingCard", back_populates="thing")

    __table_args__ = (
        UniqueConstraint("device_id", "thing_name", name="unique_device_id_thing_name"),
        CheckConstraint(
            thing_type.in_(["sensor", "actuator"]), name="allow sensor or actuator"
        ),
    )


class UserThingCard(Base):
    __tablename__ = "User_Thingz_Cards"
    card_id = Column(Integer, primary_key=True, autoincrement=True, index=True)

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("Users.user_id", ondelete="CASCADE"),
        nullable=False,
    )
    thing_id = Column(
        Integer,
        ForeignKey("Thingz.thing_id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    config = Column(JSON)
    __table_args__ = (
        UniqueConstraint("user_id", "thing_id", name="unique_card_user_card"),
    )

    user = relationship("User", back_populates="user_thingz_cards")
    thing = relationship("Thing", back_populates="user_thing_card")


class Room(Base):
    __tablename__ = "Rooms"
    room_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("Users.user_id", ondelete="CASCADE"),
        nullable=False,
    )
    room_name = Column(String, nullable=False)
    room_color = Column(String, nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "room_name", name="unique_user_room"),
    )

    user = relationship("User", back_populates="rooms")


Base.metadata.create_all(sync_engine)
