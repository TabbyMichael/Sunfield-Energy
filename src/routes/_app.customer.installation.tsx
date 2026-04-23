import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader } from "@/components/dashboard/Shared";
import { installations } from "@/lib/mock-data";
import { InstallationTimeline } from "@/components/dashboard/InstallationTimeline";
import { MapPin, Calendar, Users } from "lucide-react";

export const Route = createFileRoute("/_app/customer/installation")({
  component: CustomerInstallation,
});

function CustomerInstallation() {
  const mine = installations.find((i) => i.customer === "Zara Bello") ?? installations[0];

  return (
    <div>
      <PageHeader title="Installation Status" description="Track the rollout of your solar system." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Progress</h3>
          <div className="mt-6">
            <InstallationTimeline stage={mine.stage} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <h3 className="font-display text-lg font-bold">Project</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <dt className="text-xs text-muted-foreground">Location</dt>
                  <dd className="font-medium">{mine.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <dt className="text-xs text-muted-foreground">Scheduled</dt>
                  <dd className="font-medium">{mine.scheduled}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <dt className="text-xs text-muted-foreground">Crew</dt>
                  <dd className="font-medium">{mine.crew}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-secondary/5 p-6">
            <h3 className="font-display font-bold">Next step</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our crew is currently {mine.stage.toLowerCase()}. We'll notify you by SMS and email when this stage completes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
