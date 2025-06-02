# routes/predict_sensor.py
from fastapi import APIRouter
from pydantic import BaseModel
import pandas as pd
import joblib
from utils.logger import log_prediction

router = APIRouter()
model = joblib.load("models/ModelB (sensors_based)/modelB_sensor_rf_model.pkl")
scaler = joblib.load("models/ModelB (sensors_based)/modelB_scaler.pkl")

class SensorInput(BaseModel):
    ultrasonic: float
    vibration: float
    smell: float
    piezo: float

@router.post("/predict_sensor")
def predict_sensor(data: SensorInput):
    df = pd.DataFrame([data.dict()])
    df_scaled = scaler.transform(df)

    prediction = model.predict(df_scaled)[0]
    confidence = model.predict_proba(df_scaled)[0][prediction]
    result = "LEAK DETECTED" if prediction == 1 else "NO LEAK"

    log_prediction("sensor", result, confidence, extra=data.dict())
    return {"prediction": result, "confidence": round(confidence, 2)}
