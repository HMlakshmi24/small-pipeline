# routes/simulate.py
from fastapi import APIRouter
import numpy as np
import requests

router = APIRouter()

@router.get("/simulate")
def simulate():
    # Random sensor data
    sensor_data = {
        "ultrasonic": np.random.normal(5.0, 1.5),
        "vibration": np.random.normal(2.0, 0.5),
        "smell": np.random.normal(0.5, 0.2),
        "piezo": np.random.normal(1.2, 0.3)
    }

    response = requests.post("http://localhost:8000/predict_sensor", json=sensor_data)
    return {
        "simulated_input": sensor_data,
        "result": response.json()
    }
