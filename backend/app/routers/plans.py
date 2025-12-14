from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from ..models import Plan, Subscription
from ..deps import get_db, get_current_user, trainer_only

router = APIRouter(prefix="/plans", tags=["Plans"])


# ✅ PUBLIC ENDPOINT (NO AUTH REQUIRED)
@router.get("/")
def get_all_plans(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    plans = db.query(Plan).all()
    result = []

    for plan in plans:
        subscribed = False

        if user:
            subscribed = db.query(Subscription).filter(
                Subscription.user_id == user.id,
                Subscription.plan_id == plan.id
            ).first() is not None

        result.append({
            "id": plan.id,
            "title": plan.title,
            "price": plan.price,
            "trainer_id": plan.trainer_id,
            "description": plan.description if subscribed else None
        })

    return result


# 🔒 TRAINER ONLY
@router.post("/")
def create_plan(
    plan: dict,
    db: Session = Depends(get_db),
    trainer=Depends(trainer_only)
):
    new_plan = Plan(
        title=plan["title"],
        description=plan["description"],
        price=plan["price"],
        duration_days=plan["duration_days"],
        trainer_id=trainer.id
    )
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan
