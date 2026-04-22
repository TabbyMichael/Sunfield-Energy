from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from decimal import Decimal


class QuoteItemBase(BaseModel):
    product_id: str
    quantity: Decimal
    unit_price: Decimal


class QuoteItemCreate(QuoteItemBase):
    pass


class QuoteItemResponse(QuoteItemBase):
    id: str
    quote_id: str

    class Config:
        from_attributes = True


class QuoteBase(BaseModel):
    lead_id: str
    system_size_kw: Optional[Decimal] = None
    total_price: Optional[Decimal] = None
    status: str = "draft"


class QuoteCreate(QuoteBase):
    items: List[QuoteItemCreate]


class QuoteUpdate(BaseModel):
    system_size_kw: Optional[Decimal] = None
    total_price: Optional[Decimal] = None
    status: Optional[str] = None
    valid_until: Optional[datetime] = None


class QuoteResponse(QuoteBase):
    id: str
    created_by: Optional[str] = None
    valid_until: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    items: List[QuoteItemResponse] = []

    class Config:
        from_attributes = True
