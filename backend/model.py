from pydantic import BaseModel


class Session(BaseModel):
    muid: int
    device_type: str
    transfer_usd: int
    fraud: bool


class GetSessionModel(Session):
    id: str
