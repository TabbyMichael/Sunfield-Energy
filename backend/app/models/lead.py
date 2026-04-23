from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.db.base import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    phone = Column(String)
    email = Column(String)
    location = Column(String)
    monthly_bill = Column(Numeric(10, 2))
    energy_need_kw = Column(Numeric(10, 2))
    status = Column(String, default="new")  # new, contacted, qualified, lost
    assigned_staff_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    assigned_staff = relationship("User", back_populates="leads_assigned")
    quotes = relationship("Quote", back_populates="lead")
