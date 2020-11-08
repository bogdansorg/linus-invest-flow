"""Services to interact with the data store."""
from sqlalchemy.orm import Session

from backend.store.models import Investment


class InvestmentService:
    """Service for creating and persisting 'Investment' records."""

    def __init__(self, session: Session):
        self.session = session

    def save(self, investment: Investment):
        self.session.add(investment)
        self.session.commit()
