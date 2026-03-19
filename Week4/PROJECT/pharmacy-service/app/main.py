from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import models, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="VitaCare Pharmacy Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/pharmacy/health")
def health_check():
    return {"status": "ok", "service": "pharmacy-service"}

@app.get("/api/pharmacy/medicines/search")
def search_medicines(query: str = "", db: Session = Depends(database.get_db)):
    medicines = db.query(models.Medicine).filter(models.Medicine.name.ilike(f"%{query}%")).all()
    return medicines

@app.post("/api/pharmacy/medicines")
def add_medicine(name: str, stock: int, price: float, description: str = "", db: Session = Depends(database.get_db)):
    med = db.query(models.Medicine).filter(models.Medicine.name == name).first()
    if med:
        med.stock += stock
    else:
        med = models.Medicine(name=name, stock=stock, price=price, description=description)
        db.add(med)
    db.commit()
    db.refresh(med)
    return med

@app.post("/api/pharmacy/order")
def place_order(medicine_id: int, quantity: int, db: Session = Depends(database.get_db)):
    med = db.query(models.Medicine).filter(models.Medicine.id == medicine_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found")
    if med.stock < quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock")
    
    med.stock -= quantity
    db.commit()
    return {"message": "Order placed successfully", "remaining_stock": med.stock}
