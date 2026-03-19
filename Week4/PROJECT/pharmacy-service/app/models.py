from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    description = Column(String)
    stock = Column(Integer, default=0)
    price = Column(Float, default=0.0)
