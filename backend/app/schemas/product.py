from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal


class ProductBase(BaseModel):
    name: str
    category: str  # residential, commercial, industrial
    capacity_kw: Decimal
    price: Decimal
    description: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
