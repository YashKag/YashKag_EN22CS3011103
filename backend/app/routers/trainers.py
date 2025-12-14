from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import User, Plan
from ..deps import get_db

router = APIRouter(tags=["Trainers"])  # ❗ NO PREFIX


@router.get("/trainers")
def list_trainers(db: Session = Depends(get_db)):
    trainers = db.query(User).filter(User.role == "trainer").all()
    return [
        {
            "id": t.id,
            "name": t.name,
            "email": t.email
        }
        for t in trainers
    ]


@router.get("/trainer/{trainer_id}")
def get_trainer(trainer_id: int, db: Session = Depends(get_db)):
    trainer = db.query(User).filter(
        User.id == trainer_id,
        User.role == "trainer"
    ).first()

    if not trainer:
        raise HTTPException(status_code=404, detail="Trainer not found")

    plans = db.query(Plan).filter(Plan.trainer_id == trainer_id).all()

    return {
        "id": trainer.id,
        "name": trainer.name,
        "email": trainer.email,
        "plans": [
            {
                "id": p.id,
                "title": p.title,
                "price": p.price
            } for p in plans
        ]
    }
