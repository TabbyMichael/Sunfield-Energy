import type { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { hasPermission, hasRole, type Permission, type Role } from "@/lib/rbac";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

interface RoleGuardProps {
  allowed: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component-based guard that checks if the user has one of the allowed roles.
 */
export function RoleGuard({ allowed, children, fallback }: RoleGuardProps) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!hasRole(user.role, allowed)) {
    return (
      fallback ?? (
        <div className="flex min-h-[60vh] items-center justify-center p-8 text-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Access denied</h2>
            <p className="mt-2 text-muted-foreground">
              Your role ({user.role}) doesn't have access to this area.
            </p>
          </div>
        </div>
      )
    );
  }
  return <>{children}</>;
}

interface PermissionGuardProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component-based guard that checks if the user has a specific permission.
 */
export function PermissionGuard({ permission, children, fallback }: PermissionGuardProps) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!hasPermission(user.role, permission)) {
    return (
      fallback ?? (
        <div className="flex min-h-[60vh] items-center justify-center p-8 text-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Access restricted</h2>
            <p className="mt-2 text-muted-foreground">
              You don't have the "{permission}" permission required for this view.
            </p>
          </div>
        </div>
      )
    );
  }
  return <>{children}</>;
}

interface CanProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Inline permission check for showing/hiding UI elements.
 */
export function Can({ permission, children, fallback = null }: CanProps) {
  const { user } = useAuth();
  if (!hasPermission(user?.role, permission)) return <>{fallback}</>;
  return <>{children}</>;
}
