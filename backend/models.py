# models.py
from pydantic import BaseModel


class ErrorInput(BaseModel):
    error: str


class ErrorOutput(BaseModel):
    explanation: str
    fix: str
    learning: str
