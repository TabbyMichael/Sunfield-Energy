from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal


class RevenueStatsResponse(BaseModel):
    date: datetime
    total_revenue: Decimal
    total_orders: int


class LeadConversionResponse(BaseModel):
    date: datetime
    leads: int
    quotes: int
    orders: int
    lead_to_quote_rate: Optional[float] = None
    quote_to_order_rate: Optional[float] = None


class InstallationMetricsResponse(BaseModel):
    date: datetime
    installations_completed: int
    avg_duration_hours: Optional[float] = None


class StaffPerformanceResponse(BaseModel):
    staff_id: str
    staff_name: Optional[str] = None
    leads_handled: int
    quotes_created: int
    installations_completed: int
    conversion_rate: Optional[float] = None


class FunnelStatsResponse(BaseModel):
    total_leads: int
    total_quotes: int
    total_orders: int
    total_installations: int
    lead_to_quote_rate: float
    quote_to_order_rate: float
    order_to_installation_rate: float
