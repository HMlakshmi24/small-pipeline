import cv2
import joblib
from pathlib import Path

# Load saved model and scaler
model = joblib.load("modelA_xgb_image_model.pkl")
scaler = joblib.load("modelA_scaler.pkl")

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

# Open video stream (0 = default webcam)
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    features = extract_features(gray).reshape(1, -1)
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)[0]

    label = "LEAK DETECTED" if prediction == 1 else "NO LEAK"
    color = (0, 0, 255) if prediction == 1 else (0, 255, 0)

    cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
    cv2.imshow("Live Feed", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
