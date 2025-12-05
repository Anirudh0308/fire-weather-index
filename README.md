# Fire Weather Index

Small end-to-end ML + API + React frontend project for predicting forest-fire occurrence using the **Algerian Forest Fires dataset**.

The project trains a classification model to detect whether conditions are likely to produce a **Fire** or **Not Fire**, exposes it via a **FastAPI backend**, and visualises predictions and history in a **Vite + React** frontend.


## Tech Stack

**ML & Backend**

- Python 3.9+
- pandas, numpy, scikit-learn, joblib
- FastAPI, Uvicorn
- SQLAlchemy + SQLite

**Frontend**

- Node 18+
- Vite + React
- Tailwind CSS
- React Router

## Setup & Installation

1. Clone the repository
```
    git clone https://github.com/Anirudh0308/FWI_Project.git
```

2. Create and activate Python venv
```
    python -m venv env

    env\Scripts\activate
```

Install base ML requirements :
```
    pip install -r requirements.txt
```

Install backend (API) requirements:
```
    pip install -r backend/requirements.txt
    
    cd backend
    pip install -r requirements.txt
```
3. Run and Setup frontend:
```
    cd frontend
    npm install

    npm run dev
```
4. Run with uvicorn:
```
    uvicorn main:app --reload
    
    python -m uvicorn main:app --reload --port 8000
```



