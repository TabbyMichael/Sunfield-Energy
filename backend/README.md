# Solar SaaS Backend

A production-grade FastAPI backend engineered for a Solar Energy SaaS platform, featuring enterprise-grade authentication, role-based access control, PostgreSQL integration, and advanced business analytics.

## Technology Stack

- **FastAPI 0.115** - Modern, high-performance web framework with automatic OpenAPI documentation
- **SQLAlchemy 2.0** - Python SQL toolkit and ORM with async support
- **PostgreSQL** - Enterprise-grade relational database with advanced features
- **Alembic** - Database migration tool for schema versioning
- **Pydantic 2.9** - Data validation using Python type annotations
- **python-jose** - JWT token generation and validation
- **passlib** - Secure password hashing with bcrypt
- **Pydantic Settings** - Configuration management with environment variables

## Architecture Highlights

- **JWT Authentication** - Stateless token-based authentication with configurable expiration
- **RBAC System** - Granular role-based access control (Admin, Staff, Customer roles)
- **Modular Design** - Clean separation of concerns with dedicated layers (models, schemas, services, API)
- **Analytics Engine** - Real-time business intelligence with revenue tracking, conversion funnels, and staff performance metrics
- **Database Versioning** - Alembic-managed migrations for production-safe schema updates

## Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── core/
│   │   ├── config.py           # Application settings
│   │   ├── security.py         # JWT & password hashing
│   │   ├── rbac.py             # Role-based access control
│   │   └── dependencies.py     # FastAPI dependencies
│   ├── db/
│   │   ├── session.py          # Database session management
│   │   └── base.py             # SQLAlchemy base
│   ├── models/
│   │   ├── user.py             # User model
│   │   ├── role.py             # Role & Permission models
│   │   ├── product.py          # Product model
│   │   ├── lead.py             # Lead model
│   │   ├── quote.py            # Quote & QuoteItem models
│   │   ├── order.py            # Order & Payment models
│   │   ├── installation.py     # Installation & InstallationStep models
│   │   └── analytics.py        # Analytics models
│   ├── schemas/
│   │   ├── auth.py             # Auth schemas
│   │   ├── lead.py             # Lead schemas
│   │   ├── product.py          # Product schemas
│   │   ├── quote.py            # Quote schemas
│   │   ├── order.py            # Order schemas
│   │   ├── installation.py     # Installation schemas
│   │   └── analytics.py        # Analytics schemas
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py         # Auth endpoints
│   │       ├── users.py        # User endpoints
│   │       ├── leads.py        # Lead endpoints
│   │       ├── products.py     # Product endpoints
│   │       ├── quotes.py       # Quote endpoints
│   │       ├── orders.py       # Order endpoints
│   │       ├── installations.py # Installation endpoints
│   │       └── analytics.py    # Analytics endpoints
│   └── services/
│       └── analytics.py        # Analytics business logic
├── alembic/
│   ├── versions/
│   │   └── 001_initial_schema.py
│   ├── env.py
│   └── script.py.mako
├── requirements.txt
└── .env.example
```

## Setup Instructions

### Prerequisites

- Python 3.10 or higher
- PostgreSQL 14 or higher
- pip (Python package manager)

### 1. Create Virtual Environment

**On Linux/macOS:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Update the following in `.env`:
- `DATABASE_URL` - Your PostgreSQL connection string
- `SECRET_KEY` - Generate a secure secret key for JWT (use `python -c "import secrets; print(secrets.token_urlsafe(32))"`)

### 4. Set up PostgreSQL

Create a database named `solar_db`:

```sql
CREATE DATABASE solar_db;
```

### 5. Run Migrations

```bash
alembic upgrade head
```

### 6. Start the Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

API documentation (Swagger UI): `http://localhost:8000/docs`

### 7. Deactivate Virtual Environment

When done, deactivate the virtual environment:

```bash
deactivate
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get access token

### Users
- `GET /api/v1/users/me` - Get current user info
- `GET /api/v1/users/` - List all users (admin/staff only)

### Leads
- `GET /api/v1/leads/` - List all leads
- `GET /api/v1/leads/{id}` - Get specific lead
- `POST /api/v1/leads/` - Create new lead
- `PUT /api/v1/leads/{id}` - Update lead

### Products
- `GET /api/v1/products/` - List all products
- `GET /api/v1/products/{id}` - Get specific product
- `POST /api/v1/products/` - Create product (admin only)
- `PUT /api/v1/products/{id}` - Update product (admin only)

### Quotes
- `GET /api/v1/quotes/` - List all quotes
- `GET /api/v1/quotes/{id}` - Get specific quote
- `POST /api/v1/quotes/` - Create new quote
- `PUT /api/v1/quotes/{id}` - Update quote
- `POST /api/v1/quotes/{id}/approve` - Approve quote (admin only)

### Orders
- `GET /api/v1/orders/` - List all orders
- `GET /api/v1/orders/{id}` - Get specific order
- `POST /api/v1/orders/` - Create new order
- `PUT /api/v1/orders/{id}` - Update order
- `POST /api/v1/orders/{id}/payments` - Create payment

### Installations
- `GET /api/v1/installations/` - List all installations
- `GET /api/v1/installations/{id}` - Get specific installation
- `POST /api/v1/installations/` - Create new installation
- `PUT /api/v1/installations/{id}` - Update installation

### Analytics
- `GET /api/v1/analytics/revenue` - Daily revenue statistics
- `GET /api/v1/analytics/conversion` - Lead conversion statistics
- `GET /api/v1/analytics/staff-performance` - Staff performance metrics
- `GET /api/v1/analytics/funnel` - Overall sales funnel
- `GET /api/v1/analytics/installations` - Installation performance
- `GET /api/v1/analytics/products/popularity` - Product popularity
- `GET /api/v1/analytics/revenue/by-category` - Revenue by category

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

## Roles & Permissions

- **Admin** - Full access to all endpoints
- **Staff** - Access to leads, quotes, orders, installations, and analytics
- **Customer** - Limited access (to be implemented)

## Database Schema

The database includes the following main tables:
- `users` - User accounts
- `roles` - User roles (admin, staff, customer)
- `permissions` - System permissions
- `products` - Solar product catalog
- `leads` - Sales leads
- `quotes` - Price quotes with items
- `orders` - Customer orders
- `payments` - Payment records
- `installations` - Installation schedules
- `installation_steps` - Installation checklist
- `daily_revenue_stats` - Aggregated revenue data
- `lead_conversion_stats` - Aggregated conversion data
- `installation_metrics` - Installation performance data
- `analytics_events` - Event tracking

## Development

### Create a New Migration

```bash
alembic revision --autogenerate -m "description of changes"
```

### Apply Migrations

```bash
alembic upgrade head
```

### Rollback Migrations

```bash
alembic downgrade -1
```

## Production Considerations

1. **Security**
   - Change `SECRET_KEY` in production
   - Use environment variables for sensitive data
   - Enable HTTPS
   - Implement rate limiting

2. **Database**
   - Use connection pooling
   - Enable SSL for PostgreSQL
   - Set up regular backups

3. **Performance**
   - Add database indexes as needed
   - Implement caching (Redis)
   - Use Celery for background tasks

4. **Monitoring**
   - Add logging
   - Set up error tracking (Sentry)
   - Monitor API performance

## License

MIT
