import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical } from "lucide-react";

export const Route = createFileRoute("/_app/admin/users")({
  component: () => (
    <RoleGuard allowed={["admin"]}>
      <UsersPage />
    </RoleGuard>
  ),
});

const users = [
  { id: "u_1", name: "Amara Okafor", email: "amara@solarflow.io", role: "admin", status: "Accepted", joined: "2024-09-12" },
  { id: "u_2", name: "Daniel Mensah", email: "daniel@solarflow.io", role: "staff", status: "Accepted", joined: "2024-10-04" },
  { id: "u_3", name: "Sade Adebayo", email: "sade@solarflow.io", role: "staff", status: "Accepted", joined: "2024-11-21" },
  { id: "u_4", name: "Zara Bello", email: "zara@example.com", role: "customer", status: "Accepted", joined: "2025-02-18" },
  { id: "u_5", name: "Ibrahim Musa", email: "ibrahim@example.com", role: "customer", status: "Sent", joined: "2025-04-09" },
];

function UsersPage() {
  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage workspace members and customer accounts."
        actions={
          <Button className="bg-gradient-solar text-primary-foreground hover:opacity-90">
            <Plus className="mr-1 h-4 w-4" /> Invite user
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border/40 last:border-0 hover:bg-background/30">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-solar text-xs font-bold text-primary-foreground">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 capitalize">{u.role}</td>
                <td className="px-5 py-4"><StatusBadge status={u.status} /></td>
                <td className="px-5 py-4 text-muted-foreground">{u.joined}</td>
                <td className="px-5 py-4 text-right">
                  <button className="rounded-md p-1.5 hover:bg-muted"><MoreVertical className="h-4 w-4 text-muted-foreground" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
