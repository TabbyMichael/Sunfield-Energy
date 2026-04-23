import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { leads } from "@/lib/mock-data";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/staff/leads")({
  component: LeadsPage,
});

const statuses = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"] as const;
const segments = ["All", "Industrial", "Commercial", "Residential"] as const;

function LeadsPage() {
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [segment, setSegment] = useState<(typeof segments)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = leads.filter((l) => {
    if (status !== "All" && l.status !== status) return false;
    if (segment !== "All" && l.segment !== segment) return false;
    if (q && !`${l.name} ${l.company}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Manage your sales pipeline."
        actions={
          <Button className="bg-gradient-solar text-primary-foreground hover:opacity-90">
            <Plus className="mr-1 h-4 w-4" /> New lead
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or company…"
            className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="h-9 rounded-lg border border-border bg-surface px-3 text-sm focus:border-primary focus:outline-none">
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={segment} onChange={(e) => setSegment(e.target.value as typeof segment)} className="h-9 rounded-lg border border-border bg-surface px-3 text-sm focus:border-primary focus:outline-none">
          {segments.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Lead</th>
              <th className="px-5 py-3 font-medium">Segment</th>
              <th className="px-5 py-3 font-medium">Est. kW</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Owner</th>
              <th className="px-5 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-border/40 last:border-0 hover:bg-background/30">
                <td className="px-5 py-4">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.company} · {l.id}</div>
                </td>
                <td className="px-5 py-4">{l.segment}</td>
                <td className="px-5 py-4 font-mono">{l.estimatedKw}</td>
                <td className="px-5 py-4"><StatusBadge status={l.status} /></td>
                <td className="px-5 py-4 text-muted-foreground">{l.owner}</td>
                <td className="px-5 py-4 text-muted-foreground">{l.createdAt}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">No leads match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
