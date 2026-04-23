import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shared";
import { Shield, Check } from "lucide-react";
import { rolePermissions } from "@/lib/rbac";

export const Route = createFileRoute("/_app/admin/roles")({
  component: RolesPage,
});

const allPermissions = Array.from(
  new Set(Object.values(rolePermissions).flat())
).sort();

function RolesPage() {
  const roles = Object.keys(rolePermissions) as (keyof typeof rolePermissions)[];

  return (
    <div>
      <PageHeader title="Roles & Permissions" description="Granular access control across the platform." />

      <div className="grid gap-4 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role} className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-solar">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display text-lg font-bold capitalize">{role}</div>
                <div className="text-xs text-muted-foreground">{rolePermissions[role].length} permissions</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {rolePermissions[role].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm">
                  <Check className="h-3.5 w-3.5 text-success" />
                  <span className="text-muted-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
        <h3 className="font-display text-lg font-bold">Permission matrix</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-6 font-medium">Permission</th>
                {roles.map((r) => <th key={r} className="px-3 py-2 text-center font-medium capitalize">{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {allPermissions.map((p) => (
                <tr key={p} className="border-b border-border/40 last:border-0">
                  <td className="py-3 pr-6 text-muted-foreground">{p}</td>
                  {roles.map((r) => (
                    <td key={r} className="px-3 py-3 text-center">
                      {rolePermissions[r].includes(p) ? (
                        <Check className="mx-auto h-4 w-4 text-success" />
                      ) : (
                        <span className="text-muted-foreground/30">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
