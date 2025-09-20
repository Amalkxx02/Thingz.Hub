from pydantic import BaseModel
from typing import Dict, Any

class SensorsData(BaseModel):
    device_MAC: str
    api_key: str
    data: Dict[str, Any]
    