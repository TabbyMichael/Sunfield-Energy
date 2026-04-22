import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { orders } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/staff/orders")({
  component: () => (
    <RoleGuard allowed={["staff", "admin"]}>
      <StaffOrdersPage />
    </RoleGuard>
  ),
});

function StaffOrdersPage() {
  return (
    <div>
      <PageHeader title="Assigned Orders" description="Orders allocated to you for delivery." />
      <div className="grid gap-4 lg:grid-cols-2">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{o.id}</div>
                <h3 className="mt-1 font-display text-lg font-bold">{o.customer}</h3>
              </div>
              <StatusBadge status={o.status} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground">Total</div><div className="font-semibold">${o.total.toLocaleString()}</div></div>
              <div><div className="text-xs text-muted-foreground">Quote</div><div className="font-mono text-xs">{o.quoteId}</div></div>
              <div><div className="text-xs text-muted-foreground">Crew</div><div className="font-medium">{o.assignedTo}</div></div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span><span>{o.progress}%</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-solar" style={{ width: `${o.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
