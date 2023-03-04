from pydantic import BaseModel

class Product(BaseModel):
    id_product: int
    name: str
    price: str
    size: str | None
    img: str | None
    description: str | None
    brand: str | None
    category: str

    class Config:
        orm_mode = True