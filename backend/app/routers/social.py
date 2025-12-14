from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..models import Follow, Subscription, Plan
from ..deps import get_db, get_current_user

router = APIRouter(tags=["Social"])


@router.post("/subscribe/{plan_id}")
def subscribe_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    sub = Subscription(user_id=user.id, plan_id=plan_id)
    db.add(sub)
    db.commit()
    return {"message": "Subscribed successfully"}


@router.post("/follow/{trainer_id}")
def follow_trainer(
    trainer_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    follow = Follow(user_id=user.id, trainer_id=trainer_id)
    db.add(follow)
    db.commit()
    return {"message": "Trainer followed"}


@router.delete("/follow/{trainer_id}")
def unfollow_trainer(
    trainer_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    follow = db.query(Follow).filter(
        Follow.user_id == user.id,
        Follow.trainer_id == trainer_id
    ).first()
    if follow:
        db.delete(follow)
        db.commit()
    return {"message": "Trainer unfollowed"}


@router.get("/feed")
def personalized_feed(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    followed = db.query(Follow.trainer_id).filter(
        Follow.user_id == user.id
    ).subquery()

    plans = db.query(Plan).filter(
        Plan.trainer_id.in_(followed)
    ).all()

    return plans
