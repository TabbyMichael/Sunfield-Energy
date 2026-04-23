import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";

export const Route = createFileRoute("/_app/staff")({
  component: () => (
    <RoleGuard allowed={["staff", "admin"]}>
      <Outlet />
    </RoleGuard>
  ),
});
