import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatCard } from "@/components/dashboard/Shared";
import { Users, FileText, Wrench, Calendar } from "lucide-react";
import { leads, quotes, installations } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/staff/")({
  component: () => (
    <RoleGuard allowed={["staff"]}>
      <StaffOverview />
    </RoleGuard>
  ),
});

function StaffOverview() {
  return (
    <div>
      <PageHeader title="My Workspace" description="Today's leads, quotes and installations." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Leads" value="14" delta="+3 today" icon={Users} accent="primary" />
        <StatCard label="Pending Quotes" value="6" icon={FileText} accent="secondary" />
        <StatCard label="Installations Today" value="2" icon={Wrench} accent="success" />
        <StatCard label="Site Visits This Week" value="9" icon={Calendar} accent="primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Hot leads</h3>
          <ul className="mt-4 space-y-3">
            {leads.filter((l) => ["Qualified", "Proposal"].includes(l.status)).slice(0, 4).map((l) => (
              <li key={l.id} className="flex items-center justify-between rounded-lg border border-border/40 bg-background p-3">
                <div>
                  <div className="text-sm font-medium">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.company} · {l.estimatedKw} kW</div>
                </div>
                <div className="text-xs font-medium text-primary">{l.status}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Recent quotes</h3>
          <ul className="mt-4 space-y-3">
            {quotes.slice(0, 4).map((q) => (
              <li key={q.id} className="flex items-center justify-between rounded-lg border border-border/40 bg-background p-3">
                <div>
                  <div className="text-sm font-medium">{q.customer}</div>
                  <div className="text-xs text-muted-foreground">{q.id} · {q.systemKw} kW</div>
                </div>
                <div className="text-sm font-semibold">${q.total.toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card lg:col-span-2">
          <h3 className="font-display text-lg font-bold">Upcoming installations</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {installations.slice(0, 4).map((i) => (
              <li key={i.id} className="rounded-lg border border-border/40 bg-background p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{i.customer}</span>
                  <span className="text-xs text-muted-foreground">{i.scheduled}</span>
                </div>
                <div className="text-xs text-muted-foreground">{i.address} · {i.systemKw} kW</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
