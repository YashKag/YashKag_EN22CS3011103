# FitPlanHub 

FitPlanHub is a full-stack fitness platform where certified trainers create paid fitness plans and users can follow trainers and subscribe to plans.

## Features
- User & Trainer authentication (JWT)
- Role-based dashboards
- Trainer fitness plan CRUD
- Follow / Unfollow trainers
- Paid plan subscription (simulated)
- Personalized user feed
- Secure access control

## Tech Stack
- Backend: FastAPI, SQLAlchemy, SQLite
- Frontend: React.js, Tailwind CSS
- Authentication: JWT

## How to Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
