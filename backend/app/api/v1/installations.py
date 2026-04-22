from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.core.rbac import require_role
from app.schemas.installation import InstallationCreate, InstallationUpdate, InstallationResponse
from app.models.installation import Installation, InstallationStep

router = APIRouter()


@router.get("/", response_model=List[InstallationResponse])
def get_installations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    installations = db.query(Installation).offset(skip).limit(limit).all()
    return installations


@router.get("/{installation_id}", response_model=InstallationResponse)
def get_installation(
    installation_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    installation = db.query(Installation).filter(Installation.id == installation_id).first()
    if not installation:
        raise HTTPException(status_code=404, detail="Installation not found")
    return installation


@router.post("/", response_model=InstallationResponse, status_code=status.HTTP_201_CREATED)
def create_installation(
    installation_data: InstallationCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    new_installation = Installation(
        order_id=installation_data.order_id,
        assigned_staff_id=installation_data.assigned_staff_id,
        status=installation_data.status,
        start_date=installation_data.start_date,
        end_date=installation_data.end_date,
        notes=installation_data.notes
    )
    db.add(new_installation)
    db.flush()
    
    # Create installation steps
    for step_data in installation_data.steps:
        step = InstallationStep(
            installation_id=new_installation.id,
            step_name=step_data.step_name,
            status=step_data.status
        )
        db.add(step)
    
    db.commit()
    db.refresh(new_installation)
    return new_installation


@router.put("/{installation_id}", response_model=InstallationResponse)
def update_installation(
    installation_id: str,
    installation_data: InstallationUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    installation = db.query(Installation).filter(Installation.id == installation_id).first()
    if not installation:
        raise HTTPException(status_code=404, detail="Installation not found")
    
    for field, value in installation_data.model_dump(exclude_unset=True).items():
        setattr(installation, field, value)
    
    db.commit()
    db.refresh(installation)
    return installation
