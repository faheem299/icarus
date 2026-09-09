from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot import ask_icarus

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"status": "Icarus backend is running"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    reply = await ask_icarus(request.message)
    return {"reply": reply}