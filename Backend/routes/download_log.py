# routes/download_log.py
from fastapi import APIRouter
from fastapi.responses import FileResponse
import pandas as pd
from pathlib import Path

router = APIRouter()
log_path = Path("logs/prediction_log.csv")

@router.get("/download_log")
def download_log():
    if log_path.exists():
        df = pd.read_csv(log_path)
        xls_path = log_path.with_suffix(".xlsx")
        df.to_excel(xls_path, index=False)
        return FileResponse(xls_path, filename="prediction_log.xlsx", media_type="application/vnd.ms-excel")
    return {"error": "Log file not found"}
