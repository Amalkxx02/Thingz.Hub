from pydantic import BaseModel
from typing import Dict, Any

class SensorsData(BaseModel):
    esp_id: str
    api_key: str
    data: Dict[str, Any]
    