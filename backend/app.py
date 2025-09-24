from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routes import users,sensors,devices,devicesCard,rooms,actuators,sensorsData

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

app.include_router(sensors.router)
app.include_router(actuators.router)
app.include_router(users.router)
app.include_router(devices.router)
app.include_router(rooms.router)
app.include_router(devicesCard.router)
app.include_router(sensorsData.router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
