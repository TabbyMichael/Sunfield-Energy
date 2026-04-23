import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { quotes } from "@/lib/mock-data";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin/quotes")({
  component: AdminQuotesPage,
});

function AdminQuotesPage() {
  return (
    <div>
      <PageHeader
        title="Quotes"
        description="All quotes across the organization."
        actions={
          <Link to="/staff/quotes">
            <Button className="bg-gradient-solar text-primary-foreground hover:opacity-90">
              <Plus className="mr-1 h-4 w-4" /> New quote
            </Button>
          </Link>
        }
      />
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search quotes…"
            className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Quote</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">System</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b border-border/40 last:border-0 hover:bg-background/30">
                <td className="px-5 py-4 font-mono text-xs">{q.id}</td>
                <td className="px-5 py-4 font-medium">{q.customer}</td>
                <td className="px-5 py-4 text-muted-foreground">{q.systemKw} kW · {q.panels} panels{q.battery ? " · battery" : ""}</td>
                <td className="px-5 py-4 font-semibold">${q.total.toLocaleString()}</td>
                <td className="px-5 py-4"><StatusBadge status={q.status} /></td>
                <td className="px-5 py-4 text-muted-foreground">{q.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
