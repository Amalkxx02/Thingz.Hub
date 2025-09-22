from fastapi import FastAPI
import uvicorn

from routes import users,devices,sensors,actuators


app = FastAPI()

app.include_router(sensors.router)
app.include_router(actuators.router)
app.include_router(users.router)
app.include_router(devices.router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
