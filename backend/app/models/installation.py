from sqlalchemy import Column, String, DateTime, ForeignKey, Text, func
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.db.base import Base


class Installation(Base):
    __tablename__ = "installations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    assigned_staff_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(String, default="scheduled")  # scheduled, in_progress, testing, completed
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class InstallationStep(Base):
    __tablename__ = "installation_steps"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    installation_id = Column(UUID(as_uuid=True), ForeignKey("installations.id", ondelete="CASCADE"))
    step_name = Column(String)
    status = Column(String, default="pending")  # pending, done
    completed_at = Column(DateTime(timezone=True))
