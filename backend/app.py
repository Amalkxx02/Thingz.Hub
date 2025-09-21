from fastapi import FastAPI
import uvicorn

from routes.sensors import router as sensors_router
from routes.actuators import router as actuators_router
from routes.userauth import router as userauth_router

app = FastAPI()

app.include_router(sensors_router)
app.include_router(actuators_router)
app.include_router(userauth_router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
