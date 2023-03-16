from fastapi import FastAPI, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder

from db.database import SessionLocal, engine
from db.schemas import schemas
from db.models import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(  tags=["PMBB"],
                responses={status.HTTP_404_NOT_FOUND: {"message": "Not found"}})

origins = [
    "http://127.0.0.1:3000", 'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Dependecy
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

# En caso de usar paginado mediante API
# @app.get("/products", status_code=status.HTTP_200_OK)
# async def get_products_page(page: int | None = None):
#     #Retorna lista por defecto de productos, por ejemplo primeros 20 sin filtrar?
#     # Mostrar pagina 1 cuando no se especifica numero de pagina?
#     if page:
#         return {"page": page}
#     return {"page": 1}

# En caso de utilizar solo para obtener datos de los productos de la DB.
# Query a la DB de los productos y enviar JSON al frontend.

@app.get("/products", status_code=status.HTTP_200_OK)
async def get_products_page(db: Session = Depends(get_db)):
    db_products = db.query(models.Product).all()
    if not db_products:
        raise HTTPException(status_code=404, detail="No se encuentran productos")
    return db_products

@app.post("/product", status_code=status.HTTP_200_OK)
async def post_product(product: schemas.Product, db: Session = Depends(get_db)):
    db_product = models.Product(id_product=product.id_product,
                                name=product.name,
                                price=product.price,
                                size=product.size,
                                img=product.img,
                                description=product.description,
                                brand=product.brand,
                                category=product.category)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

#'http://localhost:8000/products/?name=name'
@app.get("/products/", status_code=status.HTTP_200_OK)
async def product_query(request: Request, name: str, db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(func.lower(models.Product.name).contains(func.lower(name))).all()
    print(name)
    return db_product