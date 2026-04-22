import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { orders } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/admin/orders")({
  component: () => (
    <RoleGuard allowed={["admin"]}>
      <AdminOrdersPage />
    </RoleGuard>
  ),
});

function AdminOrdersPage() {
  return (
    <div>
      <PageHeader title="Orders" description="Track every order from procurement to completion." />
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Progress</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Crew</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-border/40 last:border-0 hover:bg-background/30">
                <td className="px-5 py-4 font-mono text-xs">{o.id}</td>
                <td className="px-5 py-4 font-medium">{o.customer}</td>
                <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                <td className="px-5 py-4 w-48">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-solar" style={{ width: `${o.progress}%` }} />
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{o.progress}%</div>
                </td>
                <td className="px-5 py-4 font-semibold">${o.total.toLocaleString()}</td>
                <td className="px-5 py-4 text-muted-foreground">{o.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
