import os
from fastapi import FastAPI, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import models, database

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="VitaCare Health Records Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/records/health")
def health_check():
    return {"status": "ok", "service": "health-records-service"}

@app.post("/api/records/upload")
async def upload_record(
    patient_id: int, 
    doctor_id: int, 
    file: UploadFile = File(...), 
    db: Session = Depends(database.get_db)
):
    upload_dir = f"/storage/{patient_id}"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = f"{upload_dir}/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    new_record = models.HealthRecord(
        patient_id=patient_id,
        doctor_id=doctor_id,
        file_name=file.filename,
        file_path=file_path
    )
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return {"message": "Record uploaded securely", "record_id": new_record.id}

@app.get("/api/records/patient/{patient_id}")
def get_patient_records(patient_id: int, db: Session = Depends(database.get_db)):
    records = db.query(models.HealthRecord).filter(models.HealthRecord.patient_id == patient_id).all()
    return records
