from sqlalchemy import Column, String, Numeric, DateTime, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid
from app.db.base import Base


class DailyRevenueStats(Base):
    __tablename__ = "daily_revenue_stats"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date = Column(DateTime(timezone=True))
    total_revenue = Column(Numeric(15, 2))
    total_orders = Column(Numeric(10, 0))


class LeadConversionStats(Base):
    __tablename__ = "lead_conversion_stats"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date = Column(DateTime(timezone=True))
    leads = Column(Numeric(10, 0))
    quotes = Column(Numeric(10, 0))
    orders = Column(Numeric(10, 0))


class InstallationMetrics(Base):
    __tablename__ = "installation_metrics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date = Column(DateTime(timezone=True))
    installations_completed = Column(Numeric(10, 0))
    avg_duration_hours = Column(Numeric(10, 2))


class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_type = Column(String)
    user_id = Column(UUID(as_uuid=True))
    event_metadata = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
