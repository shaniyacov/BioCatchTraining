from model import GetSessionModel, Session
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')

database = client.BioCatch
collection = database.Sessions


async def fetch_one_session(muid):
    doc = await collection.find_one({"muid": muid})
    doc['_id'] = str(doc['_id'])
    doc['id'] = str(doc['_id'])
    session_data = GetSessionModel(**doc)
    return session_data


async def fetch_all_sessions():
    sessions = []
    cursor = collection.find({})
    async for document in cursor:
        document['_id'] = str(document['_id'])
        document['id'] = str(document['_id'])
        session_data = GetSessionModel(**document)
        sessions.append(session_data)
    return sessions


async def create_session(session: Session):
    document = session
    result = await collection.insert_one(document)
    return document


async def update_session(muid: int, session: Session):
    await collection.update_one({"muid": muid}, {"$set": {
        "device_type": session.device_type,
        "transfer_usd": session.transfer_usd,
        "fraud": session.fraud
    }})
    document = await collection.find_one({"muid": muid})
    return document


async def delete_session(muid):
    doc = await collection.find_one({"muid": muid})
    print(doc)
    await collection.delete_one({"muid": muid})
    return True
