import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { roleHomePath } from "@/lib/rbac";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardRedirect,
});

function DashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <Navigate to={roleHomePath[user.role] as "/"} />;
}
