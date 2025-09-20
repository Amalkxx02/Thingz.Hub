from fastapi import FastAPI

from routes.sensors import router as sensors_router
from routes.actuators import router as actuators_router

app = FastAPI()

app.include_router(sensors_router)
app.include_router(actuators_router)
