from fastapi import HTTPException
from pydantic import BaseModel, EmailStr, Field, model_validator
from typing import Dict, Any, List, Union

class UserSignIn(BaseModel):
    user_email: EmailStr
    user_password: str = Field(..., min_length=8)


class UserSignUp(BaseModel):
    user_name: str
    user_email: EmailStr
    user_password: str = Field(..., min_length=8)


class RoomAdd(BaseModel):
    room_name: str
    room_color: str


class ThingCardAdd(BaseModel):
    thing_id: int
    thing_config: Dict[str, Any]


class DeviceAdd(BaseModel):
    device_id: str
    device_name: str


class SensorValidate(BaseModel):
    sensor_name: str


class Sensor(BaseModel):
    sensors: List[SensorValidate]


class ActuatorValidate(BaseModel):
    actuator_name: str


class Actuator(BaseModel):
    actuators: List[ActuatorValidate]


class ThingAdd(BaseModel):
    thingz: List[Union[Sensor, Actuator]] = []

    @model_validator(mode="after")
    def check_at_least_one_thing_exists(self):
        if not self.thingz:
            raise HTTPException(
                status_code=400, detail="A device must have at least one thing"
            )
        return self
