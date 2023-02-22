from fastapi import FastAPI, Depends, HTTPException, status

app = FastAPI(  tags=["PMBB"],
                responses={status.HTTP_404_NOT_FOUND: {"message": "Not found"}})

# En caso de usar paginado mediante API
@app.get("/products/", status_code=status.HTTP_200_OK)
async def get_products_page(page: int | None = None):
    #Retorna lista por defecto de productos, por ejemplo primeros 20 sin filtrar?
    # Mostrar pagina 1 cuando no se especifica numero de pagina?
    if page:
        return {"page": page}
    return {"page": 1}

# En caso de utilizar solo para obtener datos de los productos de la DB
# Query a la DB de los productos y enviar JSON al frontend. 