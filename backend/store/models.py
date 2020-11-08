"""Data models."""
from backend.store import Base, engine
from sqlalchemy import Column, Integer, String


class Investment(Base):
    """Data model for investment commitment."""
    __tablename__ = 'investments'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    investment_amount = Column(Integer)
    project_id = Column(Integer)


Base.metadata.create_all(engine)
