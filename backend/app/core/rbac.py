from fastapi import Depends, HTTPException, status
from typing import List
from app.core.dependencies import get_current_user


def require_role(required_roles: List[str]):
    def wrapper(user: dict = Depends(get_current_user)):
        if user.get("role") not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return user
    return wrapper


def require_permission(permission: str):
    def wrapper(user: dict = Depends(get_current_user)):
        user_permissions = user.get("permissions", [])
        if permission not in user_permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Missing permission: {permission}"
            )
        return user
    return wrapper
