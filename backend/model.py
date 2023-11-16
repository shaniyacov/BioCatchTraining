from pydantic import BaseModel, Field
from enum import Enum


class DeviceTypeEnum(Enum):
    PC = "pc"
    ANDROID = "android"
    IOS = "ios"


class Session(BaseModel):
    muid: str
    device_type: DeviceTypeEnum
    transfer_usd: float
    fraud: bool


class GetSessionModel(Session):
    id: str = Field(..., alias="_id")
    deleted: bool
