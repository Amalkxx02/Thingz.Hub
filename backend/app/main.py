from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import users, devices, thingz, user_thingz_cards,data_handle

app = FastAPI()

origins = ["http://localhost:5173","http://192.168.1.12:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(data_handle.router)
app.include_router(users.router)
app.include_router(devices.router)
#app.include_router(rooms.router)
app.include_router(thingz.router)
app.include_router(user_thingz_cards.router)
