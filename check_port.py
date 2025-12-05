import requests

try:
    print("Testing Root Endpoint on Port 8000...")
    r = requests.get("http://127.0.0.1:8000/")
    print(f"Status: {r.status_code}")
    print(f"Content: {r.text}")

except Exception as e:
    print(f"Error: {e}")
