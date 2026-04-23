"""
Script to generate sample notifications for testing
Run this script to create placeholder notifications for Admin, Staff, and Customer dashboards
"""
import sys
import os
import uuid
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import create_engine, text
from app.core.config import settings
from datetime import datetime, timedelta

def create_sample_notifications():
    engine = create_engine(settings.DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Get all users with their roles (from user_roles junction table)
            result = conn.execute(text("""
                SELECT u.id, r.name as role
                FROM users u
                LEFT JOIN user_roles ur ON u.id = ur.user_id
                LEFT JOIN roles r ON ur.role_id = r.id
            """))
            users = result.fetchall()
            
            if not users:
                print("No users found. Please create users first.")
                return
            
            print(f"Found {len(users)} users")
            
            # Sample notifications for each user
            sample_notifications = [
                {
                    "title": "Welcome to SolarFlow!",
                    "message": "Thank you for joining our solar energy platform. Get started by exploring your dashboard.",
                    "type": "success",
                    "link": None
                },
                {
                    "title": "New Quote Request",
                    "message": "You have a new quote request from a potential customer. Review and respond promptly.",
                    "type": "info",
                    "link": "/staff/leads"
                },
                {
                    "title": "Installation Scheduled",
                    "message": "Your solar panel installation has been scheduled for next week. Our team will contact you with details.",
                    "type": "success",
                    "link": "/customer/installation"
                },
                {
                    "title": "System Update",
                    "message": "We've improved our dashboard with new features. Check out the latest updates.",
                    "type": "info",
                    "link": None
                },
                {
                    "title": "Order Confirmation",
                    "message": "Your order has been confirmed and is being processed. You will receive updates on shipping.",
                    "type": "success",
                    "link": "/customer/orders"
                },
                {
                    "title": "Payment Received",
                    "message": "We've received your payment. Thank you for choosing SolarFlow!",
                    "type": "success",
                    "link": "/customer/orders"
                },
                {
                    "title": "Installation Complete",
                    "message": "Your solar installation is complete. Your system is now generating clean energy.",
                    "type": "success",
                    "link": "/customer/installation"
                },
                {
                    "title": "Maintenance Reminder",
                    "message": "It's time for your annual system maintenance check. Schedule your appointment today.",
                    "type": "warning",
                    "link": "/customer/installation"
                },
                {
                    "title": "New User Registration",
                    "message": "A new customer has registered on the platform. Review their account details.",
                    "type": "info",
                    "link": "/admin/users"
                },
                {
                    "title": "Report Generated",
                    "message": "Your monthly analytics report is ready for review.",
                    "type": "info",
                    "link": "/admin/analytics"
                },
                {
                    "title": "Lead Assignment",
                    "message": "You've been assigned 3 new leads. Follow up with potential customers today.",
                    "type": "info",
                    "link": "/staff/leads"
                },
                {
                    "title": "Quote Approval Required",
                    "message": "A quote requires your approval before it can be sent to the customer.",
                    "type": "warning",
                    "link": "/admin/quotes"
                }
            ]
            
            created_count = 0
            now = datetime.utcnow()
            
            for user_id, role in users:
                # Determine which notifications to add based on user role
                if role == "admin":
                    role_notifications = sample_notifications[8:12]  # Admin-specific
                elif role == "staff":
                    role_notifications = sample_notifications[1:4] + sample_notifications[10:12]  # Staff-specific
                else:  # customer
                    role_notifications = sample_notifications[0:8]  # Customer-specific
                
                for i, notif_data in enumerate(role_notifications):
                    is_read = i > 1  # Mark first 2 as unread, rest as read
                    created_at = now - timedelta(days=i, hours=i*2)
                    read_at = now - timedelta(days=i, hours=i*2) if is_read else None
                    
                    conn.execute(text("""
                        INSERT INTO notifications (id, user_id, title, message, type, is_read, link, created_at, read_at)
                        VALUES (:id, :user_id, :title, :message, :type, :is_read, :link, :created_at, :read_at)
                    """), {
                        "id": str(uuid.uuid4()),
                        "user_id": str(user_id),
                        "title": notif_data["title"],
                        "message": notif_data["message"],
                        "type": notif_data["type"],
                        "link": notif_data["link"],
                        "is_read": is_read,
                        "created_at": created_at,
                        "read_at": read_at
                    })
                    created_count += 1
            
            conn.commit()
            print(f"Successfully created {created_count} sample notifications")
        
    except Exception as e:
        print(f"Error creating sample notifications: {e}")

if __name__ == "__main__":
    create_sample_notifications()
