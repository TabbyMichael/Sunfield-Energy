from sqlalchemy import Column, String, Numeric, DateTime, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.db.base import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    sku = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, nullable=False)  # Panel, Inverter, Battery
    capacity_kw = Column(Numeric(10, 2))
    price = Column(Numeric(10, 2), nullable=False)
    stock = Column(Numeric(10, 0), default=0)
    description = Column(Text)
    image_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    quote_items = relationship("QuoteItem", back_populates="product")
