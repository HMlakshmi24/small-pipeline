# utils/logger.py
import csv
from datetime import datetime
from pathlib import Path

log_file = Path("logs/prediction_log.csv")
log_file.parent.mkdir(exist_ok=True)

def log_prediction(source, result, confidence, extra=None):
    entry = {
        "timestamp": datetime.now().isoformat(),
        "source": source,
        "result": result,
        "confidence": round(confidence, 2)
    }
    if extra:
        entry.update(extra)

    write_header = not log_file.exists()
    with open(log_file, mode="a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=entry.keys())
        if write_header:
            writer.writeheader()
        writer.writerow(entry)
