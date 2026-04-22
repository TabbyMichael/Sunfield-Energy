from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal


class OrderBase(BaseModel):
    quote_id: str
    customer_id: str
    total_amount: Optional[Decimal] = None
    status: str = "pending"


class OrderCreate(OrderBase):
    pass


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    total_amount: Optional[Decimal] = None


class OrderResponse(OrderBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class PaymentBase(BaseModel):
    order_id: str
    amount: Decimal
    method: str  # mpesa, card, bank
    transaction_ref: Optional[str] = None


class PaymentCreate(PaymentBase):
    pass


class PaymentResponse(PaymentBase):
    id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
