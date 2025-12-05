from sqlalchemy import Column, Integer, Float, String, DateTime
from database import Base
from datetime import datetime

class PredictionRecord(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Inputs
    Temperature = Column(Float)
    RH = Column(Float)
    Ws = Column(Float)
    Rain = Column(Float)
    FFMC = Column(Float)
    DMC = Column(Float)
    DC = Column(Float)
    ISI = Column(Float)
    BUI = Column(Float)
    FWI = Column(Float)
    
    # Result
    prediction = Column(String)
    probability = Column(Float)
