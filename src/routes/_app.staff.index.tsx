import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatCard } from "@/components/dashboard/Shared";
import DashboardMap from "@/components/dashboard/DashboardMap";
import { Users, FileText, Wrench, Calendar, MapPin } from "lucide-react";
import { installationMapLocations, installations, leads, quotes } from "@/lib/mock-data";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/staff/")({
  component: StaffOverview,
});

function StaffOverview() {
  const [locations, setLocations] = useState(installationMapLocations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch installation locations from API
    fetch('http://127.0.0.1:8000/api/v1/installations/map-locations', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setLocations(Array.isArray(data) && data.length > 0 ? data : installationMapLocations);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching locations:', err);
        setLocations(installationMapLocations);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <PageHeader title="My Workspace" description="Today's leads, quotes and installations." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Leads" value="14" delta="+3 today" icon={Users} accent="primary" />
        <StatCard label="Pending Quotes" value="6" icon={FileText} accent="secondary" />
        <StatCard label="Installations Today" value="2" icon={Wrench} accent="success" />
        <StatCard label="Site Visits This Week" value="9" icon={Calendar} accent="primary" />
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Installation Sites
            </h3>
            <p className="text-xs text-muted-foreground">View all active installation locations</p>
          </div>
        </div>
        {loading ? (
          <div className="h-96 flex items-center justify-center text-gray-500">
            Loading map...
          </div>
        ) : (
          <DashboardMap locations={locations} height="400px" />
        )}
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
