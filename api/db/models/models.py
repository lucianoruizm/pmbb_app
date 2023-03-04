from sqlalchemy import Column, Integer, String, Float
from db.database import Base

class Product(Base):
    __tablename__ = "product"
    id_product = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Float)
    size = Column(String)
    img = Column(String)
    description = Column(String)
    brand = Column(String)
    category = Column(String)