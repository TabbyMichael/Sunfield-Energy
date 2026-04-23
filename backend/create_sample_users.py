"""
Script to create sample users for testing
Run this script to create placeholder users for Admin, Staff, and Customer roles
"""
import sys
import os
import uuid
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import create_engine, text
from app.core.config import settings
from datetime import datetime

def create_sample_users():
    engine = create_engine(settings.DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Check if users already exist
            result = conn.execute(text("SELECT COUNT(*) FROM users"))
            count = result.scalar()
            
            if count > 0:
                print(f"Users already exist ({count} found). Skipping user creation.")
                return
            
            # Create roles if they don't exist
            roles = [
                {"name": "admin"},
                {"name": "staff"},
                {"name": "customer"}
            ]
            
            role_ids = {}
            for role in roles:
                result = conn.execute(text("SELECT id FROM roles WHERE name = :name"), {"name": role["name"]})
                existing = result.fetchone()
                if existing:
                    role_ids[role["name"]] = str(existing[0])
                else:
                    role_id = str(uuid.uuid4())
                    conn.execute(text("""
                        INSERT INTO roles (id, name)
                        VALUES (:id, :name)
                    """), {"id": role_id, "name": role["name"]})
                    role_ids[role["name"]] = role_id
            
            print(f"Roles: {role_ids}")
            
            # Create sample users
            users = [
                {
                    "name": "Admin User",
                    "email": "admin@solarflow.com",
                    "password": "admin123",
                    "role": "admin"
                },
                {
                    "name": "Staff User",
                    "email": "staff@solarflow.com",
                    "password": "staff123",
                    "role": "staff"
                },
                {
                    "name": "Customer User",
                    "email": "customer@example.com",
                    "password": "customer123",
                    "role": "customer"
                }
            ]
            
            for user in users:
                user_id = str(uuid.uuid4())
                # Use a simple hash for testing (not for production)
                hashed_password = user["password"]  # Storing plain text for testing
                
                conn.execute(text("""
                    INSERT INTO users (id, name, email, hashed_password, is_active, created_at, updated_at)
                    VALUES (:id, :name, :email, :hashed_password, :is_active, :created_at, :updated_at)
                """), {
                    "id": user_id,
                    "name": user["name"],
                    "email": user["email"],
                    "hashed_password": hashed_password,
                    "is_active": True,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                })
                
                # Assign role
                conn.execute(text("""
                    INSERT INTO user_roles (user_id, role_id)
                    VALUES (:user_id, :role_id)
                """), {
                    "user_id": user_id,
                    "role_id": role_ids[user["role"]]
                })
                
                print(f"Created user: {user['name']} ({user['role']})")
            
            conn.commit()
            print(f"Successfully created {len(users)} sample users")
            print("\nLogin credentials:")
            for user in users:
                print(f"  {user['role']}: {user['email']} / {user['password']}")
        
    except Exception as e:
        print(f"Error creating sample users: {e}")

if __name__ == "__main__":
    create_sample_users()
