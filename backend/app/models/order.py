from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quote_id = Column(UUID(as_uuid=True), ForeignKey("quotes.id"))
    customer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    total_amount = Column(Numeric(10, 2))
    status = Column(String, default="pending")  # pending, paid, installing, completed
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    quote = relationship("Quote", back_populates="order")
    customer = relationship("User", back_populates="orders")
    payments = relationship("Payment", back_populates="order")
    installation = relationship("Installation", back_populates="order", uselist=False)


class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"))
    amount = Column(Numeric(10, 2))
    method = Column(String)  # mpesa, card, bank
    status = Column(String)
    transaction_ref = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    order = relationship("Order", back_populates="payments")
