from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class InstallationStepBase(BaseModel):
    step_name: str
    status: str = "pending"


class InstallationStepCreate(InstallationStepBase):
    pass


class InstallationStepResponse(InstallationStepBase):
    id: str
    installation_id: str
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class InstallationBase(BaseModel):
    order_id: str
    assigned_staff_id: Optional[str] = None
    status: str = "scheduled"
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    notes: Optional[str] = None


class InstallationCreate(InstallationBase):
    steps: Optional[List[InstallationStepCreate]] = []


class InstallationUpdate(BaseModel):
    status: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    notes: Optional[str] = None


class InstallationResponse(InstallationBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    steps: List[InstallationStepResponse] = []

    class Config:
        from_attributes = True
