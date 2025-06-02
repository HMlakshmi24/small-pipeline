# routes/predict_camera.py
from fastapi import APIRouter, UploadFile, File
import cv2
import numpy as np
import joblib
import tempfile
from utils.logger import log_prediction

router = APIRouter()
model = joblib.load("models/ModelA (camera_based)/modelA_xgb_image_model.pkl")
scaler = joblib.load("models/ModelA (camera_based)/modelA_scaler.pkl")

def extract_features(image):
    image = cv2.resize(image, (128, 128))
    mean = np.mean(image)
    std = np.std(image)
    max_val = np.max(image)
    min_val = np.min(image)
    entropy = -np.sum((image/255.0) * np.log2(image/255.0 + 1e-9))
    hist = cv2.calcHist([image], [0], None, [16], [0, 256]).flatten()
    hist /= np.sum(hist)
    return np.array([mean, std, max_val, min_val, entropy, *hist])

@router.post("/predict_camera")
async def predict_camera(file: UploadFile = File(...)):
    contents = await file.read()
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    image = cv2.imread(tmp_path, cv2.IMREAD_GRAYSCALE)
    features = extract_features(image).reshape(1, -1)
    features_scaled = scaler.transform(features)

    prediction = model.predict(features_scaled)[0]
    confidence = model.predict_proba(features_scaled)[0][prediction]
    result = "LEAK DETECTED" if prediction == 1 else "NO LEAK"

    log_prediction("camera", result, confidence)
    return {"prediction": result, "confidence": round(confidence, 2)}
