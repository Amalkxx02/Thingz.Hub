from pydantic import BaseModel, EmailStr
from typing import Dict, Any

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserCreateSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    
class RoomSchema(BaseModel):
    user_id: str
    name: str
    color: str
    
class DeviceCreateSchema(BaseModel):
    device_id: str
    user_id: str
    name: str 

class DeviceCardSchema(BaseModel):
    sensor_id: str
    config: Dict[str, Any]

class SensorRegisterSchema(BaseModel):
    device_id: str
    data: Dict[str, Any]
    
class SensorReadSchema(BaseModel):
    device_id: str
    data: Dict[str, Any]