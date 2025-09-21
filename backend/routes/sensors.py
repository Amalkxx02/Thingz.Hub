from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert
from schemas.schemas import SensorsData
from models.models import DevicesTable,SensorsDataTable,SensorsTable
from database import SessionLocal

router = APIRouter(prefix="/sensors", tags=["sensors"]) # Creates a router with the base path '/sensors' and groups routes under the 'sensors' tag


def get_db():           # Dependency generator function to provide a database session.

    db = SessionLocal() # Create a new database session
                        # Session Manages database operations and transactions between the app and the database
                        # Querying data (reading), Adding new records, Updating existing records, Deleting records
    try:
        yield db        # Provide the session to the caller
    finally:
        db.close()      # Close the session after use

@router.post("")    # Defines a POST endpoint at the current router’s base path (empty string means no additional path)

# Async endpoint receiving sensor data and a database session via dependency injection
async def get_data(Sensors_Data: SensorsData, db : Session = Depends(get_db)): # Parameters- variable : pydantic model
    
    # Query the DevicesTable to find the first device matching the given MAC address and API key
    device = db.query(DevicesTable).filter_by(device_MAC = Sensors_Data.device_MAC, api_key = Sensors_Data.api_key).first() # Check reciving device is registerd
    
    if not device:
        raise HTTPException(status_code=401, detail="Unauthorized") # Error if not registerd 
    
    # Create a new SensorsDataTable entry with device MAC and sensor data from the request
    SensorDataEntry = SensorsDataTable(device_MAC=Sensors_Data.device_MAC, data = Sensors_Data.data)
    db.add(SensorDataEntry) # Add the new record to the session
    db.commit()             # Commit the transaction to save it in the database

    insert_data_to_SensorsTable(db)   # Await the asynchronous function to insert data into SensorsTable using the given database session


    print(f"Received data from {Sensors_Data.device_MAC}: {Sensors_Data.data}")
    return {"status": "ok"}

def insert_data_to_SensorsTable(db:Session):
    data_in_SensorDataTable = db.query(SensorsDataTable.device_MAC,SensorsDataTable.data).all() # Fetch all device_MAC and data from SensorsDataTable

    for device_MAC, data in data_in_SensorDataTable:    # Loop through the tupls
        for sensorName in data: # Loop through the json key for key, value in json.items() to loop also value

            insert_data = insert(SensorsTable).values(      # Prepare an insert statement with "do nothing" on conflict for unique keys
            device_MAC = device_MAC,
            sensors_name = sensorName
            ).on_conflict_do_nothing(index_elements=['device_MAC', 'sensors_name'])

            db.execute(insert_data) # Execute the insert statement
    db.commit()# Commit the transaction to save it in the database