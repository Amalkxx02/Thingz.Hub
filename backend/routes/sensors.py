from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas.schemas import SensorsData
from models.models import DevicesDataBase,SensorsDataBase
from database import SessionLocal

router = APIRouter(prefix="/sensors", tags=["sensors"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("") # listener for incoming data on/api/data endpoint from  devices
async def get_data(sensor_data: SensorsData, db : Session = Depends(get_db)):
    device = db.query(DevicesDataBase).filter_by(device_id = sensor_data.esp_id).first()
    if not device:
        raise HTTPException(status_code=401, detail="Unauthorized")
    entry = SensorsDataBase(device_id=sensor_data.esp_id, data = sensor_data.data)
    db.add(entry)
    db.commit()
    print(f"Received data from {sensor_data.esp_id}: {sensor_data.data}")
    return {"status": "ok"}