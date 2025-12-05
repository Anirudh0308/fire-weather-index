import requests
import json

try:
    # Test Root
    print("Testing Root Endpoint...")
    r = requests.get("http://127.0.0.1:8000/")
    print(f"Root Status: {r.status_code}")
    print(f"Root Response: {r.json()}")

    # Test Predict
    print("\nTesting Predict Endpoint...")
    data = {
        'day': 15, 'month': 6, 'year': 2012,
        'Temperature': 30, 'RH': 50, 'Ws': 15, 'Rain': 0.0,
        'FFMC': 80.0, 'DMC': 10.0, 'DC': 50.0, 'ISI': 5.0, 'BUI': 10.0, 'FWI': 5.0
    }
    r = requests.post("http://127.0.0.1:8000/predict", json=data)
    print(f"Predict Status: {r.status_code}")
    print(f"Predict Response: {r.json()}")

except Exception as e:
    print(f"❌ Error: {e}")
