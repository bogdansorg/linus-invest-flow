"""Services to interact with the data store."""
from backend.store import Session

from backend.store.models import Investment


class InvestmentService:
    """Service for creating and persisting 'Investment' records."""

    def __init__(self, session: Session):
        self.session = session

    def save(self, investment: Investment) -> int:
        self.session.add(investment)
        self.session.flush()
        self.session.commit()
        return investment.id
