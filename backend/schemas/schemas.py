from pydantic import BaseModel
from typing import Dict, Any

class DeviceSchema(BaseModel):
    device_id: str
    api_key: str


class SensorSchema(BaseModel):
    device_id: str
    api_key: str
    data: Dict[str, Any]

class UserSchema(BaseModel):
    name: str
    email: str
    password: str
    