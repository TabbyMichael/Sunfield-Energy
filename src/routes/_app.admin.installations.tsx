import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader } from "@/components/dashboard/Shared";
import { installations } from "@/lib/mock-data";
import { InstallationTimeline } from "@/components/dashboard/InstallationTimeline";

export const Route = createFileRoute("/_app/admin/installations")({
  component: () => (
    <RoleGuard allowed={["admin"]}>
      <AdminInstallationsPage />
    </RoleGuard>
  ),
});

function AdminInstallationsPage() {
  return (
    <div>
      <PageHeader title="Installations" description="Live status of every active installation." />
      <div className="grid gap-4 lg:grid-cols-2">
        {installations.map((i) => (
          <div key={i.id} className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-mono text-muted-foreground">{i.id}</div>
                <h3 className="mt-1 font-display text-lg font-bold">{i.customer}</h3>
                <div className="text-sm text-muted-foreground">{i.address}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">System</div>
                <div className="font-display text-xl font-bold text-gradient-solar">{i.systemKw} kW</div>
              </div>
            </div>
            <div className="my-5 h-px bg-border/60" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Scheduled</div>
                <div className="font-medium">{i.scheduled}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Crew</div>
                <div className="font-medium">{i.crew}</div>
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
