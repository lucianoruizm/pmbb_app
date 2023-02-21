from fastapi import FastAPI, Depends, HTTPException, status

app = FastAPI(  tags=["PMBB"],
                responses={status.HTTP_404_NOT_FOUND: {"message": "Not found"}})

@app.get("/")
async def root():
    return "Hello FastAPI"