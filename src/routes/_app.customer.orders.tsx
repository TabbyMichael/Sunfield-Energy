import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { orders } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/customer/orders")({
  component: () => (
    <RoleGuard allowed={["customer"]}>
      <CustomerOrdersPage />
    </RoleGuard>
  ),
});

function CustomerOrdersPage() {
  const myOrders = orders.filter((o) => o.customer === "Zara Bello");
  return (
    <div>
      <PageHeader title="My Orders" />
      <div className="space-y-4">
        {myOrders.map((o) => (
          <div key={o.id} className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{o.id}</div>
                <h3 className="mt-1 font-display text-xl font-bold">Order from Quote {o.quoteId}</h3>
              </div>
              <StatusBadge status={o.status} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground">Total</div><div className="font-semibold">${o.total.toLocaleString()}</div></div>
              <div><div className="text-xs text-muted-foreground">Crew</div><div className="font-semibold">{o.assignedTo}</div></div>
              <div><div className="text-xs text-muted-foreground">Progress</div><div className="font-semibold">{o.progress}%</div></div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-solar" style={{ width: `${o.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
