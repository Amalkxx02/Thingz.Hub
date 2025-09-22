from fastapi import APIRouter, HTTPException, Depends 

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.future import select 

from schemas.schemas import SensorSchema
from models.models import Device,SensorData,Sensor
from database import async_session_local

router = APIRouter(prefix="/sensors", tags=["sensors"]) # Creates a router with the base path '/sensors' and groups routes under the 'sensors' tag

async def get_db():           # Dependency generator function to provide a database session.

    db = async_session_local() # Create a new database session
                        # Session Manages database operations and transactions between the app and the database
                        # Querying data (reading), Adding new records, Updating existing records, Deleting records
    try:
        yield db        # Provide the session to the caller
    finally:
        await db.close()      # Close the session after use

@router.post("")    # Defines a POST endpoint at the current router’s base path (empty string means no additional path)
# Async endpoint receiving sensor data and a database session via dependency injection
async def insert_sensor_data(sensor_data: SensorSchema, db : AsyncSession = Depends(get_db)): # Parameters- variable : pydantic model
    # Query the Device to find the first device matching the given MAC address and API key
    device_query = select(Device).filter_by(device_id = sensor_data.device_id, api_key = sensor_data.api_key) # Check reciving device is registerd
    query_result = await db.execute(device_query)
    device = query_result.scalars().first()

    if not device:
        raise HTTPException(status_code=401, detail="Unauthorized") # Report error if not registerd 
    
    # Create a new SensorData entry with device MAC and sensor data from the request
    sensor_data_entry = SensorData(device_id=sensor_data.device_id, data = sensor_data.data)
    db.add(sensor_data_entry) # Add the new record to the session

    await insert_sensor(db, sensor_data.device_id, sensor_data.data)   # Function to insert data into Sensor using the given database session
    await db.commit()             # Commit the transaction to save it in the database

    print(f"Received data from {sensor_data.device_id}: {sensor_data.data}")
    return {"status": "ok"}

async def insert_sensor(db:AsyncSession, device_id:str, data:dict):

    for sensors_name in data: # Loop through each sensor name in the data dictionary
        insert_sensor = insert(Sensor).values(      # Prepare an insert statement with "do nothing" on conflict for unique keys
        device_id = device_id,
        name = sensors_name
        ).on_conflict_do_nothing(index_elements=['device_id', 'name'])

        await db.execute(insert_sensor) # Execute the insert statement

@router.get("/sendData")
async def send_data():
    return{
        "hellow":"world"
    }