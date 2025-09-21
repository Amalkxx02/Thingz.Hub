from fastapi import APIRouter, HTTPException, Depends 

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.future import select 

from schemas.schemas import SensorsData
from models.models import DevicesTable,SensorsDataTable,SensorsTable
from database import SessionLocal

router = APIRouter(prefix="/sensors", tags=["sensors"]) # Creates a router with the base path '/sensors' and groups routes under the 'sensors' tag


async def get_db():           # Dependency generator function to provide a database session.

    db = SessionLocal() # Create a new database session
                        # Session Manages database operations and transactions between the app and the database
                        # Querying data (reading), Adding new records, Updating existing records, Deleting records
    try:
        yield db        # Provide the session to the caller
    finally:
        await db.close()      # Close the session after use

@router.post("")    # Defines a POST endpoint at the current router’s base path (empty string means no additional path)

# Async endpoint receiving sensor data and a database session via dependency injection
async def get_data(Sensors_Data: SensorsData, db : AsyncSession = Depends(get_db)): # Parameters- variable : pydantic model
    
    # Query the DevicesTable to find the first device matching the given MAC address and API key
    device = select(DevicesTable).filter_by(device_MAC = Sensors_Data.device_MAC, api_key = Sensors_Data.api_key) # Check reciving device is registerd
    result = await db.execute(device)
    result.scalars().first()  
    if not result:
        raise HTTPException(status_code=401, detail="Unauthorized") # Report error if not registerd 
    
    # Create a new SensorsDataTable entry with device MAC and sensor data from the request
    SensorDataEntry = SensorsDataTable(device_MAC=Sensors_Data.device_MAC, data = Sensors_Data.data)
    db.add(SensorDataEntry) # Add the new record to the session
    await db.commit()             # Commit the transaction to save it in the database

    insert_data_to_SensorsTable(db, Sensors_Data.device_MAC, Sensors_Data.data)   # Function to insert data into SensorsTable using the given database session

    print(f"Received data from {Sensors_Data.device_MAC}: {Sensors_Data.data}")
    return {"status": "ok"}

async def insert_data_to_SensorsTable(db:AsyncSession, device_MAC:str, data:dict):
    for sensors_name in data: # Loop through each sensor name in the data dictionary
        insert_data = insert(SensorsTable).values(      # Prepare an insert statement with "do nothing" on conflict for unique keys
        device_MAC = device_MAC,
        sensors_name = sensors_name
        ).on_conflict_do_nothing(index_elements=['device_MAC', 'sensors_name'])
        await db.execute(insert_data) # Execute the insert statement
    await db.commit()# Commit the transaction to save it in the database

@router.get("")
def send_data():
    pass