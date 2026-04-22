from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.core.rbac import require_role
from app.services.analytics import (
    compute_daily_revenue,
    compute_lead_conversion,
    compute_staff_performance,
    compute_funnel_stats,
    compute_installation_metrics,
    compute_product_popularity,
    compute_revenue_by_category
)
from app.schemas.analytics import (
    RevenueStatsResponse,
    LeadConversionResponse,
    StaffPerformanceResponse,
    FunnelStatsResponse,
    InstallationMetricsResponse
)

router = APIRouter()


@router.get("/revenue", response_model=List[RevenueStatsResponse])
def get_revenue_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    """Get daily revenue statistics"""
    return compute_daily_revenue(db, days)


@router.get("/conversion", response_model=List[LeadConversionResponse])
def get_conversion_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    """Get lead conversion statistics"""
    return compute_lead_conversion(db, days)


@router.get("/staff-performance", response_model=List[StaffPerformanceResponse])
def get_staff_performance(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin"]))
):
    """Get staff performance metrics"""
    return compute_staff_performance(db)


@router.get("/funnel", response_model=FunnelStatsResponse)
def get_funnel_stats(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    """Get overall sales funnel statistics"""
    return compute_funnel_stats(db)


@router.get("/installations", response_model=List[InstallationMetricsResponse])
def get_installation_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    """Get installation performance metrics"""
    return compute_installation_metrics(db, days)


@router.get("/products/popularity")
def get_product_popularity(
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    """Get product popularity statistics"""
    return compute_product_popularity(db)


@router.get("/revenue/by-category")
def get_revenue_by_category(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: dict = Depends(require_role(["admin", "staff"]))
):
    """Get revenue breakdown by product category"""
    return compute_revenue_by_category(db, days)
