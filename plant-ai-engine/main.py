from fastapi import FastAPI
from api.routes import router

app = FastAPI(title="PlantGuard AI Engine")

app.include_router(router)