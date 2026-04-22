from sqlalchemy.orm import Session
from sqlalchemy import func, and_, extract
from datetime import datetime, timedelta
from decimal import Decimal
from typing import List, Optional
from app.models.order import Order
from app.models.lead import Lead
from app.models.quote import Quote
from app.models.installation import Installation
from app.models.user import User
from app.models.product import Product
from app.models.quote import QuoteItem


def compute_daily_revenue(db: Session, days: int = 30) -> List[dict]:
    """Compute daily revenue statistics for the last N days"""
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)
    
    results = db.query(
        func.date(Order.created_at).label('date'),
        func.sum(Order.total_amount).label('total_revenue'),
        func.count(Order.id).label('total_orders')
    ).filter(
        and_(
            Order.created_at >= start_date,
            Order.created_at <= end_date,
            Order.status == 'completed'
        )
    ).group_by(
        func.date(Order.created_at)
    ).order_by(
        func.date(Order.created_at)
    ).all()
    
    return [
        {
            'date': result.date,
            'total_revenue': result.total_revenue or Decimal('0'),
            'total_orders': result.total_orders or 0
        }
        for result in results
    ]


def compute_lead_conversion(db: Session, days: int = 30) -> List[dict]:
    """Compute lead conversion statistics for the last N days"""
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)
    
    results = db.query(
        func.date(Lead.created_at).label('date'),
        func.count(Lead.id).label('leads')
    ).filter(
        Lead.created_at >= start_date
    ).group_by(
        func.date(Lead.created_at)
    ).all()
    
    lead_stats = {result.date: result.leads for result in results}
    
    # Get quotes per day
    quote_results = db.query(
        func.date(Quote.created_at).label('date'),
        func.count(Quote.id).label('quotes')
    ).filter(
        Quote.created_at >= start_date
    ).group_by(
        func.date(Quote.created_at)
    ).all()
    
    quote_stats = {result.date: result.quotes for result in quote_results}
    
    # Get orders per day
    order_results = db.query(
        func.date(Order.created_at).label('date'),
        func.count(Order.id).label('orders')
    ).filter(
        and_(
            Order.created_at >= start_date,
            Order.status.in_(['paid', 'installing', 'completed'])
        )
    ).group_by(
        func.date(Order.created_at)
    ).all()
    
    order_stats = {result.date: result.orders for result in order_results}
    
    # Combine all dates
    all_dates = set(lead_stats.keys()) | set(quote_stats.keys()) | set(order_stats.keys())
    
    return [
        {
            'date': date,
            'leads': lead_stats.get(date, 0),
            'quotes': quote_stats.get(date, 0),
            'orders': order_stats.get(date, 0),
            'lead_to_quote_rate': round(quote_stats.get(date, 0) / lead_stats.get(date, 1) * 100, 2) if lead_stats.get(date, 0) > 0 else 0,
            'quote_to_order_rate': round(order_stats.get(date, 0) / quote_stats.get(date, 1) * 100, 2) if quote_stats.get(date, 0) > 0 else 0
        }
        for date in sorted(all_dates)
    ]


def compute_staff_performance(db: Session) -> List[dict]:
    """Compute staff performance metrics"""
    # Leads handled per staff
    lead_results = db.query(
        Lead.assigned_staff_id.label('staff_id'),
        func.count(Lead.id).label('leads_handled')
    ).group_by(
        Lead.assigned_staff_id
    ).all()
    
    lead_stats = {result.staff_id: result.leads_handled for result in lead_results}
    
    # Quotes created per staff
    quote_results = db.query(
        Quote.created_by.label('staff_id'),
        func.count(Quote.id).label('quotes_created')
    ).group_by(
        Quote.created_by
    ).all()
    
    quote_stats = {result.staff_id: result.quotes_created for result in quote_results}
    
    # Installations completed per staff
    installation_results = db.query(
        Installation.assigned_staff_id.label('staff_id'),
        func.count(Installation.id).label('installations_completed')
    ).filter(
        Installation.status == 'completed'
    ).group_by(
        Installation.assigned_staff_id
    ).all()
    
    installation_stats = {result.staff_id: result.installations_completed for result in installation_results}
    
    # Get staff names
    all_staff_ids = set(lead_stats.keys()) | set(quote_stats.keys()) | set(installation_stats.keys())
    staff_users = db.query(User.id, User.name).filter(User.id.in_(all_staff_ids)).all()
    staff_names = {user.id: user.name for user in staff_users}
    
    return [
        {
            'staff_id': staff_id,
            'staff_name': staff_names.get(staff_id),
            'leads_handled': lead_stats.get(staff_id, 0),
            'quotes_created': quote_stats.get(staff_id, 0),
            'installations_completed': installation_stats.get(staff_id, 0),
            'conversion_rate': round(quote_stats.get(staff_id, 0) / lead_stats.get(staff_id, 1) * 100, 2) if lead_stats.get(staff_id, 0) > 0 else 0
        }
        for staff_id in all_staff_ids
    ]


def compute_funnel_stats(db: Session) -> dict:
    """Compute overall sales funnel statistics"""
    total_leads = db.query(func.count(Lead.id)).scalar() or 0
    total_quotes = db.query(func.count(Quote.id)).scalar() or 0
    total_orders = db.query(func.count(Order.id)).filter(Order.status.in_(['paid', 'installing', 'completed'])).scalar() or 0
    total_installations = db.query(func.count(Installation.id)).filter(Installation.status == 'completed').scalar() or 0
    
    return {
        'total_leads': total_leads,
        'total_quotes': total_quotes,
        'total_orders': total_orders,
        'total_installations': total_installations,
        'lead_to_quote_rate': round(total_quotes / total_leads * 100, 2) if total_leads > 0 else 0,
        'quote_to_order_rate': round(total_orders / total_quotes * 100, 2) if total_quotes > 0 else 0,
        'order_to_installation_rate': round(total_installations / total_orders * 100, 2) if total_orders > 0 else 0
    }


def compute_installation_metrics(db: Session, days: int = 30) -> List[dict]:
    """Compute installation performance metrics"""
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)
    
    results = db.query(
        func.date(Installation.created_at).label('date'),
        func.count(Installation.id).label('installations_completed')
    ).filter(
        and_(
            Installation.created_at >= start_date,
            Installation.status == 'completed',
            Installation.start_date.isnot(None),
            Installation.end_date.isnot(None)
        )
    ).group_by(
        func.date(Installation.created_at)
    ).all()
    
    return [
        {
            'date': result.date,
            'installations_completed': result.installations_completed or 0
        }
        for result in results
    ]


def compute_product_popularity(db: Session) -> List[dict]:
    """Compute product popularity based on quote items"""
    results = db.query(
        Product.id.label('product_id'),
        Product.name.label('product_name'),
        Product.category.label('category'),
        func.sum(QuoteItem.quantity).label('total_quantity'),
        func.count(QuoteItem.id).label('quote_count')
    ).join(
        QuoteItem, Product.id == QuoteItem.product_id
    ).group_by(
        Product.id, Product.name, Product.category
    ).order_by(
        func.sum(QuoteItem.quantity).desc()
    ).all()
    
    return [
        {
            'product_id': result.product_id,
            'product_name': result.product_name,
            'category': result.category,
            'total_quantity': result.total_quantity or 0,
            'quote_count': result.quote_count or 0
        }
        for result in results
    ]


def compute_revenue_by_category(db: Session, days: int = 30) -> List[dict]:
    """Compute revenue breakdown by product category"""
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)
    
    results = db.query(
        Product.category.label('category'),
        func.sum(Order.total_amount).label('total_revenue')
    ).join(
        Quote, Order.quote_id == Quote.id
    ).join(
        QuoteItem, Quote.id == QuoteItem.quote_id
    ).join(
        Product, QuoteItem.product_id == Product.id
    ).filter(
        and_(
            Order.created_at >= start_date,
            Order.status == 'completed'
        )
    ).group_by(
        Product.category
    ).all()
    
    return [
        {
            'category': result.category,
            'total_revenue': result.total_revenue or Decimal('0')
        }
        for result in results
    ]
