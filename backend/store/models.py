"""Data models."""
from backend.store import Base, engine
from sqlalchemy import Column, Integer, String, Float


class Investment(Base):
    """Data model for investment commitment."""
    __tablename__ = 'investments'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    investment_amount = Column(Float)
    project_id = Column(Integer)
    # TODO assuming there's a table for investment projects this ^ should be a foreign key


Base.metadata.create_all(engine)
