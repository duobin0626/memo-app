from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

class Memo(BaseModel):
    id:str
    content:str

memos = []

app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다.'

app.mount("/", StaticFiles(directory="static",html=True), name="static")
