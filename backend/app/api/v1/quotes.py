from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.core.rbac import require_role
from app.schemas.quote import QuoteCreate, QuoteUpdate, QuoteResponse
from app.models.quote import Quote, QuoteItem

router = APIRouter()


@router.get("/", response_model=List[QuoteResponse])
def get_quotes(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    quotes = db.query(Quote).offset(skip).limit(limit).all()
    return quotes


@router.get("/{quote_id}", response_model=QuoteResponse)
def get_quote(quote_id: str, db: Session = Depends(get_db), current_user: dict = Depends(require_role(["admin", "staff"]))):
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote


@router.post("/", response_model=QuoteResponse, status_code=status.HTTP_201_CREATED)
def create_quote(
    quote_data: QuoteCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["staff", "admin"]))
):
    # Create quote
    new_quote = Quote(
        lead_id=quote_data.lead_id,
        created_by=current_user.get("id"),
        system_size_kw=quote_data.system_size_kw,
        total_price=quote_data.total_price,
        status=quote_data.status
    )
    db.add(new_quote)
    db.flush()
    
    # Create quote items
    for item_data in quote_data.items:
        quote_item = QuoteItem(
            quote_id=new_quote.id,
            product_id=item_data.product_id,
            quantity=item_data.quantity,
            unit_price=item_data.unit_price
        )
        db.add(quote_item)
    
    db.commit()
    db.refresh(new_quote)
    return new_quote


@router.put("/{quote_id}", response_model=QuoteResponse)
def update_quote(
    quote_id: str,
    quote_data: QuoteUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["staff", "admin"]))
):
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    for field, value in quote_data.model_dump(exclude_unset=True).items():
        setattr(quote, field, value)
    
    db.commit()
    db.refresh(quote)
    return quote


@router.post("/{quote_id}/approve", response_model=QuoteResponse)
def approve_quote(
    quote_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    quote.status = "approved"
    db.commit()
    db.refresh(quote)
    return quote
