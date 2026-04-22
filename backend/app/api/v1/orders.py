from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.core.rbac import require_role
from app.schemas.order import OrderCreate, OrderUpdate, OrderResponse, PaymentCreate, PaymentResponse
from app.models.order import Order, Payment

router = APIRouter()


@router.get("/", response_model=List[OrderResponse])
def get_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    orders = db.query(Order).offset(skip).limit(limit).all()
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: str, db: Session = Depends(get_db), current_user: dict = Depends(require_role(["admin", "staff"]))):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["staff", "admin"]))
):
    new_order = Order(**order_data.model_dump())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


@router.put("/{order_id}", response_model=OrderResponse)
def update_order(
    order_id: str,
    order_data: OrderUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    for field, value in order_data.model_dump(exclude_unset=True).items():
        setattr(order, field, value)
    
    db.commit()
    db.refresh(order)
    return order


@router.post("/{order_id}/payments", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
def create_payment(
    order_id: str,
    payment_data: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    new_payment = Payment(
        order_id=order_id,
        amount=payment_data.amount,
        method=payment_data.method,
        transaction_ref=payment_data.transaction_ref,
        status="pending"
    )
    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)
    return new_payment
