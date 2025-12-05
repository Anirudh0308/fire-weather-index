from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func
import joblib
import pandas as pd
import numpy as np
import os
from datetime import datetime, timedelta

from database import SessionLocal, engine, Base
from models import PredictionRecord

# Create tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="Fire Weather Index Prediction API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Load the model pipeline
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "best_model_pipeline.joblib")

try:
    pipeline = joblib.load(MODEL_PATH)
    model = pipeline['model']
    scaler = pipeline['scaler']
    imputer = pipeline['imputer']
    features = pipeline['features']
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    pipeline = None

# Define input data model
class PredictionInput(BaseModel):
    day: int
    month: int
    year: int
    Temperature: float
    RH: float            # changed
    Ws: float           # changed
    Rain: float
    FFMC: float
    DMC: float
    DC: float
    ISI: float
    BUI: float
    FWI: float

@app.get("/")
def read_root():
    return {"message": "Fire Weather Index Prediction API is running"}

@app.post("/predict")
def predict(input_data: PredictionInput, db: Session = Depends(get_db)):
    if pipeline is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Convert input to DataFrame
        data_dict = input_data.dict()
        df = pd.DataFrame([data_dict])
        
        # Ensure columns are in the correct order
        df = df[features]
        
        # Preprocess
        df_imputed = pd.DataFrame(imputer.transform(df), columns=features)
        df_scaled = scaler.transform(df_imputed)
        
        # Predict
        prediction = model.predict(df_scaled)[0]
        probability = model.predict_proba(df_scaled)[0][1]
        
        result = "Fire" if prediction == 1 else "Not Fire"
        
        # Save to DB
        db_record = PredictionRecord(
            Temperature=input_data.Temperature,
            RH=input_data.RH,
            Ws=input_data.Ws,
            Rain=input_data.Rain,
            FFMC=input_data.FFMC,
            DMC=input_data.DMC,
            DC=input_data.DC,
            ISI=input_data.ISI,
            BUI=input_data.BUI,
            FWI=input_data.FWI,
            prediction=result,
            probability=float(probability)
        )
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        
        return {
            "prediction": result,
            "probability": float(probability),
            "input": data_dict,
            "id": db_record.id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/history")
def get_history(limit: int = 50, db: Session = Depends(get_db)):
    records = db.query(PredictionRecord).order_by(PredictionRecord.timestamp.desc()).limit(limit).all()
    return records

@app.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    total = db.query(PredictionRecord).count()
    fire_count = db.query(PredictionRecord).filter(PredictionRecord.prediction == "Fire").count()
    safe_count = total - fire_count
    
    # Average FWI
    avg_fwi = db.query(func.avg(PredictionRecord.FWI)).scalar() or 0
    
    # Recent trend (last 7 records)
    recent = db.query(PredictionRecord).order_by(PredictionRecord.timestamp.desc()).limit(7).all()
    trend = [{"id": r.id, "fwi": r.FWI, "prob": r.probability} for r in reversed(recent)]
    
    return {
        "total_predictions": total,
        "fire_count": fire_count,
        "safe_count": safe_count,
        "avg_fwi": round(avg_fwi, 2),
        "trend": trend
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
