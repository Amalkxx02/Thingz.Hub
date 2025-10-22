"""
models.py
----------
Defines SQLAlchemy ORM models for the IoT Dashboard system.

Tables:
- Users: Stores user credentials and profile data. uuid used to generate user_id
- Devices: IoT devices registered under each user. uuid used to generate device_id
- things: Individual sensors or actuators associated with devices.
- User_things_Cards: UI cards on user dashboards for displaying or controlling Things.
- Rooms: Logical grouping of Things (user's room setup).(currently not included)

Relationships:
User → Devices → things
User → Rooms
things ↔ User_things_Cards

/************FUTURE************/
add __repr__ for easier debug
room implementation
"""

from sqlalchemy import (
    Column,
    Integer,
    String,
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
    
    """ Represents a user account in the IoT Dashboard system. """
    
    __tablename__ = "Users"
    user_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4, # Generate a random uuid
        nullable=False,
        index=True,
    )
    user_name = Column(String, nullable=False)
    user_email = Column(String, unique=True, nullable=False)

    """ LargeBinary to safely store hashed passwords (bcrypt/scrypt). """

    user_password = Column(LargeBinary, nullable=False)
    """ server_default=func.now() for save current date and time """
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    """
    Relationships:
        - devices: All IoT devices registered by this user.
        - rooms: Logical room groupings created by the user.(currently not)
        - user_things_cards: UI cards representing the user's chosen Things.
    """
    devices = relationship("Device", back_populates="user")
    #rooms = relationship("Room", back_populates="user")
    user_things_cards = relationship("UserThingCard", back_populates="user")


class Device(Base):
    """
    Represents a physical IoT device linked to a user.
    Each device can host multiple Things (sensors or actuators).
    """
    __tablename__ = "Devices"
    device_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        # uuid usually get from frontend if not only generate
        default=uuid.uuid4,
        nullable=False,
        index=True,
    )
    user_id = Column(
        UUID(as_uuid=True),
        # ondelete used to delete the all row related to the parent value
        ForeignKey("Users.user_id", ondelete="CASCADE"),
        nullable=False,
    )
    device_name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("user_id","device_name", name="unique_device_name_for_each_user"),
    )

    things = relationship("Thing", back_populates="device")
    user = relationship("User", back_populates="devices")


class Thing(Base):

    """ Represents an individual Thing (sensor or actuator) on a device. """

    __tablename__ = "Things"
    thing_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    device_id = Column(
        UUID(as_uuid=True),
        ForeignKey("Devices.device_id", ondelete="CASCADE"),
        nullable=False,
    )
    thing_type = Column(String, nullable=False)
    thing_name = Column(String, nullable=False)

    device = relationship("Device", back_populates="things")
    user_thing_card = relationship("UserThingCard", back_populates="thing")

    __table_args__ = (
        UniqueConstraint("device_id", "thing_name", name="unique_device_id_thing_name"),
        CheckConstraint(
            thing_type.in_(["sensor", "actuator"]), name="allow_sensor_or_actuator"
        ),
    )


class UserThingCard(Base):
    
    """ Represents a dashboard card for a user's Thing. """
    
    __tablename__ = "User_Things_Cards"
    card_id = Column(Integer, primary_key=True, autoincrement=True, index=True)

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("Users.user_id", ondelete="CASCADE"),
        nullable=False,
    )
    thing_id = Column(
        Integer,
        ForeignKey("Things.thing_id", ondelete="CASCADE"),
        nullable=False,
        unique=True, # User can only create a card for a thing one time
    )
    """
    Each card is linked to one Thing and stores custom configuration
    (layout, color, thresholds, etc.) as JSON.
    """
    config = Column(JSON)

    __table_args__ = (
        # A user can't have multiple card for same thing
        UniqueConstraint("user_id", "thing_id", name="unique_card_user_card"),
    )

    user = relationship("User", back_populates="user_things_cards")
    thing = relationship("Thing", back_populates="user_thing_card")

"""
Room is for future will update later
class Room(Base):
    
    Represents a rooms of respective users.

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
"""
Base.metadata.create_all(sync_engine)
