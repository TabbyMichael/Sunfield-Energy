import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";

export const Route = createFileRoute("/_app/admin")({
  component: () => (
    <RoleGuard allowed={["admin"]}>
      <Outlet />
    </RoleGuard>
  ),
});
