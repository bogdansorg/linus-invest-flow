# -*- coding: utf-8 -*-

"""
linus-invest-flow.app
~~~~~~~~~~~~

"""
import typing as t
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
from fastapi_sqlalchemy import (
    db,
)  # an object to provide global access to a database session

from backend.store import DATABASE_URL
from backend.store.models import Investment
from backend.store.services import InvestmentService
from pydantic import BaseModel

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(DBSessionMiddleware, db_url=DATABASE_URL)


class InvestmentData(BaseModel):
    email: str
    amount: float
    project_id: int


# TODO find a better way to model input and DB data, currently duplicated models
# TODO expect an auth token
@app.post('/investments/')
async def create_investment(data: InvestmentData) -> t.Dict[str, int]:
    service = InvestmentService(db.session)
    new_investment = Investment(email=data.email,
                                investment_amount=data.amount,
                                project_id=data.project_id)
    try:
        new_id = service.save(new_investment)
        return {'id': new_id}
    except Exception:  # TODO be specific about which errors to catch
        raise HTTPException(status_code=503, detail='Invest service is down. Please try again later.')
