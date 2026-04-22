# Solar Sunspot Hub

A modern, production-ready Solar Energy SaaS platform built with React, TanStack Router, and FastAPI. Designed to streamline solar sales, installation management, and business analytics.

## Technology Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TanStack Router 1.168** - Type-safe routing with data loading
- **TanStack Query 5.99** - Powerful data fetching and caching
- **TanStack Start 1.167** - Full-stack React framework
- **TypeScript 5.8** - Type-safe development
- **TailwindCSS 4.2** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled component primitives
- **Recharts 3.8** - Composable charting library
- **Framer Motion 12** - Production-ready motion library
- **React Hook Form 7.71** - Performant form handling
- **Zod 3.24** - TypeScript-first schema validation

### Backend
- **FastAPI 0.115** - Modern, high-performance web framework
- **SQLAlchemy 2.0** - Python SQL toolkit and ORM
- **PostgreSQL** - Enterprise-grade relational database
- **Alembic** - Database migration tool
- **JWT Authentication** - Secure token-based auth
- **RBAC System** - Role-based access control

## Project Structure

```
solar-sunspot-hub-main/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── guards/         # Route guards and auth components
│   │   ├── layouts/        # Layout components
│   │   └── navigation/     # Navigation components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── routes/             # Route components and loaders
│   ├── router.tsx          # Router configuration
│   └── styles.css          # Global styles
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core functionality (auth, config, RBAC)
│   │   ├── db/            # Database configuration
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   └── services/      # Business logic
│   ├── alembic/           # Database migrations
│   └── requirements.txt
├── package.json           # Frontend dependencies
└── vite.config.ts         # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Python 3.10 or higher
- PostgreSQL 14 or higher

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

See [backend/README.md](backend/README.md) for detailed backend setup instructions.

## Features

### Sales Management
- Lead capture and tracking
- Quote generation with dynamic pricing
- Order management and payment processing
- Customer relationship management

### Installation Operations
- Installation scheduling and assignment
- Step-by-step installation tracking
- Staff performance monitoring
- Real-time status updates

### Business Analytics
- Revenue tracking and forecasting
- Sales funnel analysis
- Staff performance metrics
- Product popularity insights
- Installation efficiency reports

### User Management
- Role-based access control (Admin, Staff, Customer)
- Secure JWT authentication
- Permission management
- Activity tracking

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Quality

- **ESLint** - Linting and code quality checks
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Zod** - Runtime validation

## Deployment

### Frontend

Build the production bundle:
```bash
npm run build
```

Deploy the `dist/` folder to your hosting provider (Vercel, Netlify, etc.)

### Backend

See [backend/README.md](backend/README.md) for production deployment considerations.

## Architecture

### Frontend Architecture
- **Component-Driven Development** - Modular, reusable components
- **Type-Safe Routing** - TanStack Router with TypeScript
- **Data Fetching** - TanStack Query for server state
- **Form Handling** - React Hook Form with Zod validation
- **Styling** - TailwindCSS with Radix UI primitives

### Backend Architecture
- **RESTful API** - Clean API design with FastAPI
- **ORM Layer** - SQLAlchemy for database operations
- **Service Layer** - Business logic separation
- **Authentication** - JWT with role-based permissions
- **Analytics Engine** - Real-time business intelligence

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on the repository.
