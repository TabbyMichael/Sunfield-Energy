from sqlalchemy import Column, String, Boolean, DateTime, func, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Location fields
    latitude = Column(Numeric(10, 8))
    longitude = Column(Numeric(11, 8))
    address = Column(String)
    city = Column(String)
    state = Column(String)
    country = Column(String)
    postal_code = Column(String)

    # Location privacy
    location_sharing_enabled = Column(Boolean, default=False)

    # Relationships
    roles = relationship("Role", secondary="user_roles", back_populates="users")
    leads_assigned = relationship("Lead", back_populates="assigned_staff")
    quotes_created = relationship("Quote", back_populates="creator")
    orders = relationship("Order", back_populates="customer")
