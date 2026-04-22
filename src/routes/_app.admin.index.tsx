import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatCard } from "@/components/dashboard/Shared";
import { DollarSign, Users, Wrench, TrendingUp, Sun } from "lucide-react";
import { analyticsRevenue, segmentMix } from "@/lib/mock-data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/_app/admin/")({
  component: () => (
    <RoleGuard allowed={["admin"]}>
      <AdminOverview />
    </RoleGuard>
  ),
});

const COLORS = ["#F59E0B", "#0EA5E9", "#10B981"];

function AdminOverview() {
  return (
    <div>
      <PageHeader
        title="Operations Overview"
        description="Real-time view of leads, revenue and active installations."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Monthly Revenue" value="$268K" delta="+19.6% vs last month" icon={DollarSign} accent="primary" />
        <StatCard label="Active Installs" value="19" delta="+3 this week" icon={Wrench} accent="secondary" />
        <StatCard label="Pipeline Leads" value="142" delta="+24 this week" icon={Users} accent="success" />
        <StatCard label="Conversion Rate" value="32%" delta="+4.1pp" icon={TrendingUp} accent="primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold">Revenue & installations</h3>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
            <Sun className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsRevenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a2238", border: "1px solid #334155", borderRadius: 8 }} />
                <Area type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Segment mix</h3>
          <p className="text-xs text-muted-foreground">By installed capacity</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={segmentMix} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {segmentMix.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a2238", border: "1px solid #334155", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
