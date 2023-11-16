from model import GetSessionModel, Session
import motor.motor_asyncio
from bson import ObjectId

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')

database = client.BioCatch
collection = database.Sessions


async def get_existing_object(muid):
    document = await collection.find_one({"muid": muid})
    if document:
        document['_id'] = str(document['_id'])
        return document


def is_deleted(document):
    return document['deleted']


async def fetch_all_sessions():
    sessions = []
    cursor = collection.find({})
    async for document in cursor:
        document['_id'] = str(document['_id'])
        session_data = GetSessionModel(**document)
        if not session_data.deleted:
            sessions.append(session_data)
    return sessions


async def create_session(session: Session):
    document = vars(session)
    document['deleted'] = False
    document['device_type'] = session.device_type.value
    result = await collection.insert_one(document)
    return document


async def update_session(_id: str, session: Session):
    object_id = ObjectId(_id)
    result = await collection.update_one({"_id": object_id}, {"$set": {
        "muid": session.muid,
        "device_type": session.device_type,
        "transfer_usd": session.transfer_usd,
        "fraud": session.fraud
    }})
    return result.modified_count > 0


async def delete_session(muid):
    await collection.update_one({"muid": muid}, {"$set": {
        "deleted": True
    }})
    return True

