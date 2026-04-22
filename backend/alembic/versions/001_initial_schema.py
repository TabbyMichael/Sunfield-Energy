"""Initial schema for Solar SaaS platform

Revision ID: 001
Revises: 
Create Date: 2024-01-01

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Users table
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.func.now())
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=True)
    
    # Roles table
    op.create_table(
        'roles',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String(), nullable=False, unique=True)
    )
    
    # Permissions table
    op.create_table(
        'permissions',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String(), nullable=False, unique=True)
    )
    
    # User roles junction table
    op.create_table(
        'user_roles',
        sa.Column('user_id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('role_id', postgresql.UUID(as_uuid=True), primary_key=True)
    )
    
    # Role permissions junction table
    op.create_table(
        'role_permissions',
        sa.Column('role_id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('permission_id', postgresql.UUID(as_uuid=True), primary_key=True)
    )
    
    # Products table
    op.create_table(
        'products',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('category', sa.String(), nullable=False),
        sa.Column('capacity_kw', sa.Numeric(10, 2), nullable=False),
        sa.Column('price', sa.Numeric(10, 2), nullable=False),
        sa.Column('description', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.func.now())
    )
    
    # Leads table
    op.create_table(
        'leads',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String()),
        sa.Column('phone', sa.String()),
        sa.Column('email', sa.String()),
        sa.Column('location', sa.String()),
        sa.Column('monthly_bill', sa.Numeric(10, 2)),
        sa.Column('energy_need_kw', sa.Numeric(10, 2)),
        sa.Column('status', sa.String(), default='new'),
        sa.Column('assigned_staff_id', postgresql.UUID(as_uuid=True)),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.func.now()),
        sa.ForeignKeyConstraint(['assigned_staff_id'], ['users.id'])
    )
    op.create_index('idx_leads_status', 'leads', ['status'])
    op.create_index('idx_leads_staff', 'leads', ['assigned_staff_id'])
    
    # Quotes table
    op.create_table(
        'quotes',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('lead_id', postgresql.UUID(as_uuid=True)),
        sa.Column('created_by', postgresql.UUID(as_uuid=True)),
        sa.Column('system_size_kw', sa.Numeric(10, 2)),
        sa.Column('total_price', sa.Numeric(10, 2)),
        sa.Column('status', sa.String(), default='draft'),
        sa.Column('valid_until', sa.DateTime(timezone=True)),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.func.now()),
        sa.ForeignKeyConstraint(['lead_id'], ['leads.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['created_by'], ['users.id'])
    )
    op.create_index('idx_quotes_lead', 'quotes', ['lead_id'])
    
    # Quote items table
    op.create_table(
        'quote_items',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('quote_id', postgresql.UUID(as_uuid=True)),
        sa.Column('product_id', postgresql.UUID(as_uuid=True)),
        sa.Column('quantity', sa.Numeric(10, 0)),
        sa.Column('unit_price', sa.Numeric(10, 2)),
        sa.ForeignKeyConstraint(['quote_id'], ['quotes.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['product_id'], ['products.id'])
    )
    
    # Orders table
    op.create_table(
        'orders',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('quote_id', postgresql.UUID(as_uuid=True)),
        sa.Column('customer_id', postgresql.UUID(as_uuid=True)),
        sa.Column('total_amount', sa.Numeric(10, 2)),
        sa.Column('status', sa.String(), default='pending'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.func.now()),
        sa.ForeignKeyConstraint(['quote_id'], ['quotes.id']),
        sa.ForeignKeyConstraint(['customer_id'], ['users.id'])
    )
    op.create_index('idx_orders_customer', 'orders', ['customer_id'])
    
    # Payments table
    op.create_table(
        'payments',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('order_id', postgresql.UUID(as_uuid=True)),
        sa.Column('amount', sa.Numeric(10, 2)),
        sa.Column('method', sa.String()),
        sa.Column('status', sa.String()),
        sa.Column('transaction_ref', sa.String()),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.ForeignKeyConstraint(['order_id'], ['orders.id'])
    )
    
    # Installations table
    op.create_table(
        'installations',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('order_id', postgresql.UUID(as_uuid=True)),
        sa.Column('assigned_staff_id', postgresql.UUID(as_uuid=True)),
        sa.Column('status', sa.String(), default='scheduled'),
        sa.Column('start_date', sa.DateTime(timezone=True)),
        sa.Column('end_date', sa.DateTime(timezone=True)),
        sa.Column('notes', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.func.now()),
        sa.ForeignKeyConstraint(['order_id'], ['orders.id']),
        sa.ForeignKeyConstraint(['assigned_staff_id'], ['users.id'])
    )
    op.create_index('idx_installations_status', 'installations', ['status'])
    
    # Installation steps table
    op.create_table(
        'installation_steps',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('installation_id', postgresql.UUID(as_uuid=True)),
        sa.Column('step_name', sa.String()),
        sa.Column('status', sa.String(), default='pending'),
        sa.Column('completed_at', sa.DateTime(timezone=True)),
        sa.ForeignKeyConstraint(['installation_id'], ['installations.id'], ondelete='CASCADE')
    )
    
    # Analytics tables
    op.create_table(
        'daily_revenue_stats',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('date', sa.DateTime(timezone=True)),
        sa.Column('total_revenue', sa.Numeric(15, 2)),
        sa.Column('total_orders', sa.Numeric(10, 0))
    )
    
    op.create_table(
        'lead_conversion_stats',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('date', sa.DateTime(timezone=True)),
        sa.Column('leads', sa.Numeric(10, 0)),
        sa.Column('quotes', sa.Numeric(10, 0)),
        sa.Column('orders', sa.Numeric(10, 0))
    )
    
    op.create_table(
        'installation_metrics',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('date', sa.DateTime(timezone=True)),
        sa.Column('installations_completed', sa.Numeric(10, 0)),
        sa.Column('avg_duration_hours', sa.Numeric(10, 2))
    )
    
    op.create_table(
        'analytics_events',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('event_type', sa.String()),
        sa.Column('user_id', postgresql.UUID(as_uuid=True)),
        sa.Column('metadata', postgresql.JSONB()),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now())
    )


def downgrade() -> None:
    op.drop_table('analytics_events')
    op.drop_table('installation_metrics')
    op.drop_table('lead_conversion_stats')
    op.drop_table('daily_revenue_stats')
    op.drop_index('idx_installations_status', table_name='installations')
    op.drop_table('installation_steps')
    op.drop_table('installations')
    op.drop_table('payments')
    op.drop_index('idx_orders_customer', table_name='orders')
    op.drop_table('orders')
    op.drop_table('quote_items')
    op.drop_index('idx_quotes_lead', table_name='quotes')
    op.drop_table('quotes')
    op.drop_index('idx_leads_staff', table_name='leads')
    op.drop_index('idx_leads_status', table_name='leads')
    op.drop_table('leads')
    op.drop_table('products')
    op.drop_table('role_permissions')
    op.drop_table('user_roles')
    op.drop_table('permissions')
    op.drop_table('roles')
    op.drop_index('ix_users_email', table_name='users')
    op.drop_table('users')
