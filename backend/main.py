from typing import List
from uuid import UUID

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import Session, GetSessionModel
from database import (
    fetch_all_sessions,
    create_session,
    delete_session,
    update_session, get_existing_object, is_deleted
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


@app.post("/session", response_model=Session)
async def add_session(session: Session):
    document = await get_existing_object(session.muid)
    if document:
        if is_deleted(document):
            raise HTTPException(403, "This session has already been deleted")
        raise HTTPException(403, "A session with this muid already exists")
    response = await create_session(session)
    if response:
        return response
    raise HTTPException(400, "Something went wrong / Bad Request")


@app.get("/session/{session_muid}", response_model=GetSessionModel)
async def get_sessions_by_id(session_muid: str):
    document = await get_existing_object(session_muid)
    if document:
        if is_deleted(document):
            raise HTTPException(403, "This session has already been deleted")
        return document
    raise HTTPException(404, f"There is no session item with muid: {session_muid}")


@app.get("/sessions", response_model=List[GetSessionModel])
async def get_sessions():
    response = await fetch_all_sessions()
    return response


@app.delete("/session/{session_muid}")
async def delete_sessions(session_muid: str):
    received_muid = UUID(session_muid)
    document = await get_existing_object(received_muid)
    if document:
        if is_deleted(document):
            raise HTTPException(403, "This session has already been deleted")
        response = await delete_session(received_muid)
        if response:
            return "Successfully deleted session"
    raise HTTPException(404, f"There is no session item with muid: {session_muid}")


@app.put("/session/{session_muid}")
async def update_sessions(session_muid: str, session: Session):
    received_muid = UUID(session_muid)
    document = await get_existing_object(received_muid)
    if document:
        if is_deleted(document):
            raise HTTPException(403, "This session has already been deleted")
        succeeded = await update_session(document['_id'], session)
        if succeeded:
            return "Successfully updated session"
    raise HTTPException(404, f"There is no session item with muid: {session_muid}")
