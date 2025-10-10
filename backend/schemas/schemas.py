from pydantic import BaseModel, EmailStr, Field
from typing import Dict, Any

class UserSignIn(BaseModel):
    email: EmailStr
    password: str = Field(...,min_length=8)

class UserSignUp(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(...,min_length=8)

class RoomAdd(BaseModel):
    room_name: str
    room_color: str

class ThingCardAdd(BaseModel):
    thing_id: int
    thing_config: Dict[str, Any]

class DeviceAdd(BaseModel):
    device_id: str
    device_name: str 

class SensorAdd(BaseModel):
    device_id: str
    data: Dict[str, Any]
    
class SensorRead(BaseModel):
    device_id: str
    data: Dict[str, Any]