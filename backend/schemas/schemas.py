from pydantic import BaseModel
from typing import Dict, Any

class SensorsData(BaseModel):
    device_MAC: str
    api_key: str
    data: Dict[str, Any]

class UsersData(BaseModel):
    user_name: str
    user_email: str
    user_password: str
    