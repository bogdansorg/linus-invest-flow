"""Data store package."""
import os
import logging

from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

logging.basicConfig()
logging.getLogger("sqlalchemy").setLevel(logging.ERROR)

store_dir_path = os.path.dirname(os.path.realpath(__file__))
DATABASE_URL = "sqlite:///{}/database.db".format(store_dir_path)
engine = create_engine(DATABASE_URL)
Session = sessionmaker(engine)
Base = declarative_base()
