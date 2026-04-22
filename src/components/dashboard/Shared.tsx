import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "primary" | "secondary" | "success";
}) {
  const accentMap = {
    primary: "bg-gradient-solar text-primary-foreground",
    secondary: "bg-gradient-energy text-secondary-foreground",
    success: "bg-success/20 text-success",
  };
  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accentMap[accent]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
      {delta && <div className="mt-1 text-xs text-success">{delta}</div>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    New: "bg-secondary/15 text-secondary",
    Contacted: "bg-muted text-muted-foreground",
    Qualified: "bg-primary/15 text-primary",
    Proposal: "bg-warning/15 text-warning",
    Won: "bg-success/15 text-success",
    Lost: "bg-destructive/15 text-destructive",
    Draft: "bg-muted text-muted-foreground",
    Sent: "bg-secondary/15 text-secondary",
    Accepted: "bg-success/15 text-success",
    Rejected: "bg-destructive/15 text-destructive",
    Confirmed: "bg-secondary/15 text-secondary",
    Procurement: "bg-warning/15 text-warning",
    Scheduled: "bg-primary/15 text-primary",
    Installing: "bg-primary/15 text-primary",
    Completed: "bg-success/15 text-success",
  };
  const cls = map[status] || "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}
