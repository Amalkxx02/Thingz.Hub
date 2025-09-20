from fastapi import APIRouter

router = APIRouter(prefix="/actuator", tags=["actuators"])

@router.get("/")
def send_data():
    pass

