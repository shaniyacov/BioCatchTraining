from pydantic import BaseModel, Field


class Session(BaseModel):
    muid: str
    device_type: str
    transfer_usd: float
    fraud: bool


class GetSessionModel(Session):
    id: str = Field(..., alias="_id")
