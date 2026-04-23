from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.db.base import Base


class Quote(Base):
    __tablename__ = "quotes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lead_id = Column(UUID(as_uuid=True), ForeignKey("leads.id", ondelete="CASCADE"))
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    system_size_kw = Column(Numeric(10, 2))
    total_price = Column(Numeric(10, 2))
    status = Column(String, default="draft")  # draft, sent, approved, rejected
    valid_until = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    lead = relationship("Lead", back_populates="quotes")
    creator = relationship("User", back_populates="quotes_created")
    items = relationship("QuoteItem", back_populates="quote", cascade="all, delete-orphan")
    order = relationship("Order", back_populates="quote", uselist=False)


class QuoteItem(Base):
    __tablename__ = "quote_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quote_id = Column(UUID(as_uuid=True), ForeignKey("quotes.id", ondelete="CASCADE"))
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"))
    quantity = Column(Numeric(10, 0))
    unit_price = Column(Numeric(10, 2))

    # Relationships
    quote = relationship("Quote", back_populates="items")
    product = relationship("Product", back_populates="quote_items")
