import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader } from "@/components/dashboard/Shared";
import { installations } from "@/lib/mock-data";
import { InstallationTimeline } from "@/components/dashboard/InstallationTimeline";

export const Route = createFileRoute("/_app/staff/installations")({
  component: StaffInstallationsPage,
});

function StaffInstallationsPage() {
  return (
    <div>
      <PageHeader title="Installations" description="Update progress and log site visits." />
      <div className="grid gap-4 lg:grid-cols-2">
        {installations.map((i) => (
          <div key={i.id} className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{i.id}</div>
                <h3 className="mt-1 font-display text-lg font-bold">{i.customer}</h3>
                <div className="text-sm text-muted-foreground">{i.address}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{i.systemKw} kW</div>
                <div className="text-xs font-medium text-primary">{i.crew}</div>
              </div>
            </div>
            <div className="mt-5">
              <InstallationTimeline stage={i.stage} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
