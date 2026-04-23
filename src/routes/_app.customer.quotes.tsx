import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { quotes } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/customer/quotes")({
  component: CustomerQuotesPage,
});

function CustomerQuotesPage() {
  const myQuotes = quotes.filter((q) => q.customer === "Zara Bello");
  return (
    <div>
      <PageHeader title="My Quotes" description="Proposals from our engineering team." />
      <div className="space-y-4">
        {myQuotes.map((q) => (
          <div key={q.id} className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{q.id}</div>
                <h3 className="mt-1 font-display text-xl font-bold">{q.systemKw} kW Hybrid Solar System</h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  {q.panels} panels · {q.inverter}{q.battery ? " · with battery" : ""}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-bold text-gradient-solar">${q.total.toLocaleString()}</div>
                <div className="mt-1"><StatusBadge status={q.status} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
