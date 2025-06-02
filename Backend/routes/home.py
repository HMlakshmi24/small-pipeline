# routes/home.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_home():
    return {
        "message": "🚀 Welcome to the Pipeline Leak Detection API",
        "routes": ["/predict_camera", "/predict_sensor", "/simulate", "/hardware", "/download_log"]
    }
