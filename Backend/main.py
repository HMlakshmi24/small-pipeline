# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import home, predict_camera, predict_sensor, simulate, hardware_check, download_log

app = FastAPI(title="Pipeline Leak Detection API", version="1.0")


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(home.router)
app.include_router(predict_camera.router)
app.include_router(predict_sensor.router)
app.include_router(simulate.router)
app.include_router(hardware_check.router)
app.include_router(download_log.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)