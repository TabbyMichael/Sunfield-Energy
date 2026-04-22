from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from decimal import Decimal


class LeadBase(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    location: Optional[str] = None
    monthly_bill: Optional[Decimal] = None
    energy_need_kw: Optional[Decimal] = None


class LeadCreate(LeadBase):
    pass


class LeadUpdate(LeadBase):
    status: Optional[str] = None
    assigned_staff_id: Optional[str] = None


class LeadResponse(LeadBase):
    id: str
    status: str
    assigned_staff_id: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
