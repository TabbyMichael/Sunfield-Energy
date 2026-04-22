from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from app.core.config import settings
from app.api.v1 import auth, users, leads, products, quotes, orders, installations, analytics

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url=None  # Disable default ReDoc, we'll create custom
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["Users"])
app.include_router(leads.router, prefix=f"{settings.API_V1_STR}/leads", tags=["Leads"])
app.include_router(products.router, prefix=f"{settings.API_V1_STR}/products", tags=["Products"])
app.include_router(quotes.router, prefix=f"{settings.API_V1_STR}/quotes", tags=["Quotes"])
app.include_router(orders.router, prefix=f"{settings.API_V1_STR}/orders", tags=["Orders"])
app.include_router(installations.router, prefix=f"{settings.API_V1_STR}/installations", tags=["Installations"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_STR}/analytics", tags=["Analytics"])


@app.get("/")
def root():
    return {
        "message": "Solar SaaS API",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/redoc", include_in_schema=False)
async def redoc_html():
    return HTMLResponse(content="""
    <!DOCTYPE html>
    <html>
    <head>
    <title>Solar SaaS - ReDoc</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    </style>
    </head>
    <body>
    <redoc spec-url="/openapi.json"></redoc>
    <script src="https://unpkg.com/redoc@2.0.0/bundles/redoc.standalone.js"></script>
    </body>
    </html>
    """)
