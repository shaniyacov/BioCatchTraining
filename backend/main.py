from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import Session, GetSessionModel
from database import (
    fetch_one_session,
    fetch_all_sessions,
    create_session,
    delete_session,
    update_session
)

app = FastAPI()

origins = [
    'http://localhost:3000',
    'http://localhost:5173',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/session", response_model=Session)
async def add_session(session: Session):
    response = await create_session(session.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong / Bad Request")


@app.get("/session/{session_muid}", response_model=GetSessionModel)
async def get_sessions_by_id(session_muid: str):
    response = await fetch_one_session(session_muid)
    if response:
        return response
    raise HTTPException(404, f"There is no todo item with muid: {session_muid}")


@app.get("/sessions", response_model=List[GetSessionModel])
async def get_sessions():
    response = await fetch_all_sessions()
    if response:
        return response
    raise HTTPException(400, "Something went wrong / Bad Request")


@app.delete("/session/{session_muid}")
async def delete_sessions(session_muid: str):
    response = await delete_session(session_muid)
    if response:
        return "Successfully deleted todo"
    raise HTTPException(404, f"There is no todo item with muid: {session_muid}")


@app.put("/session/{session_muid}", response_model=Session)
async def update_sessions(session_muid: str, session: Session):
    response = await update_session(session_muid, session)
    if response:
        return response
    raise HTTPException(404, f"There is no todo item with muid: {session.muid}")
