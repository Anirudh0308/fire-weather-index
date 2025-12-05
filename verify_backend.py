import joblib
import pandas as pd
import os
import sys

# Add backend directory to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

MODEL_PATH = "best_model_pipeline.joblib"

try:
    print(f"Loading model from {MODEL_PATH}...")
    pipeline = joblib.load(MODEL_PATH)
    model = pipeline['model']
    scaler = pipeline['scaler']
    imputer = pipeline['imputer']
    features = pipeline['features']
    print("✅ Model loaded successfully")
    
    # Create dummy input
    input_data = {
        'day': 15, 'month': 6, 'year': 2012,
        'Temperature': 35, 'RH': 40, 'Ws': 15, 'Rain': 0.0,
        'FFMC': 85.0, 'DMC': 15.0, 'DC': 60.0, 'ISI': 8.0, 'BUI': 15.0, 'FWI': 10.0
    }
    
    df = pd.DataFrame([input_data])
    df = df[features]
    
    print("Preprocessing...")
    df_imputed = pd.DataFrame(imputer.transform(df), columns=features)
    df_scaled = scaler.transform(df_imputed)
    
    print("Predicting...")
    prediction = model.predict(df_scaled)[0]
    prob = model.predict_proba(df_scaled)[0][1]
    
    print(f"✅ Prediction: {prediction} (Prob: {prob:.4f})")
    print("Backend logic verified!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
