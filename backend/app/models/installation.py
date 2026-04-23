from sqlalchemy import Column, String, DateTime, ForeignKey, Text, func, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
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
    
    # Location fields for site monitoring
    latitude = Column(Numeric(10, 8))
    longitude = Column(Numeric(11, 8))
    site_address = Column(String)
    city = Column(String)
    state = Column(String)
    country = Column(String)
    postal_code = Column(String)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    order = relationship("Order", back_populates="installation")
    assigned_staff = relationship("User")
    steps = relationship("InstallationStep", back_populates="installation", cascade="all, delete-orphan")


class InstallationStep(Base):
    __tablename__ = "installation_steps"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    installation_id = Column(UUID(as_uuid=True), ForeignKey("installations.id", ondelete="CASCADE"))
    step_name = Column(String)
    status = Column(String, default="pending")  # pending, done
    completed_at = Column(DateTime(timezone=True))

    # Relationships
    installation = relationship("Installation", back_populates="steps")
