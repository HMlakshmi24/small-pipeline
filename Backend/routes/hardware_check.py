# routes/hardware_check.py
from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/hardware")
def check_hardware():
    sensors = ["acoustic camera", "thermal camera", "3D camera", "ultrasonic sensor", "vibration sensor", "smell/gas sensor", "piezo sensor"]
    status = {sensor: random.choice(["OFFLINE"]) for sensor in sensors}
    return {"hardware_status": status}
