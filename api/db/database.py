from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL
from dotenv import load_dotenv
import os

load_dotenv()

url = URL.create(
    drivername=os.environ.get("DRIVERNAME"),
    username=os.environ.get("USER"),
    password=os.environ.get("PASSWORD"),
    host=os.environ.get("HOST"),
    database=os.environ.get("DATABASE")
)

SQLALCHEMY_DATABASE_URL = (url)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()