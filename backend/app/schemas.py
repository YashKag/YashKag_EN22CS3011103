from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str


class UserLogin(BaseModel):
    email: str
    password: str


class PlanCreate(BaseModel):
    title: str
    description: str
    price: float
    duration_days: int


class PlanResponse(BaseModel):
    id: int
    title: str
    price: float
    duration_days: int
    trainer_id: int

    class Config:
        from_attributes = True
