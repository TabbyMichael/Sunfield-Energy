from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.core.rbac import require_role
from app.schemas.lead import LeadCreate, LeadUpdate, LeadResponse
from app.models.lead import Lead

router = APIRouter()


@router.get("/", response_model=List[LeadResponse])
def get_leads(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    leads = db.query(Lead).offset(skip).limit(limit).all()
    return leads


@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: str, db: Session = Depends(get_db), current_user: dict = Depends(require_role(["admin", "staff"]))):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.post("/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(
    lead_data: LeadCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["staff", "admin"]))
):
    new_lead = Lead(**lead_data.model_dump())
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    return new_lead


@router.put("/{lead_id}", response_model=LeadResponse)
def update_lead(
    lead_id: str,
    lead_data: LeadUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["staff", "admin"]))
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    for field, value in lead_data.model_dump(exclude_unset=True).items():
        setattr(lead, field, value)
    
    db.commit()
    db.refresh(lead)
    return lead
