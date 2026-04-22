import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatCard } from "@/components/dashboard/Shared";
import { analyticsRevenue, segmentMix } from "@/lib/mock-data";
import { DollarSign, Zap, Wrench, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/_app/admin/analytics")({
  component: () => (
    <RoleGuard allowed={["admin"]}>
      <AnalyticsPage />
    </RoleGuard>
  ),
});

const COLORS = ["#F59E0B", "#0EA5E9", "#10B981"];

function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Performance, revenue and operational metrics." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue YTD" value="$1.18M" delta="+34% YoY" icon={DollarSign} accent="primary" />
        <StatCard label="Energy Generated" value="2.4 GWh" delta="+12.4%" icon={Zap} accent="secondary" />
        <StatCard label="Installs YTD" value="79" delta="+22 vs LY" icon={Wrench} accent="success" />
        <StatCard label="Avg Deal Size" value="$14.9K" delta="+8.2%" icon={TrendingUp} accent="primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Revenue trend</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a2238", border: "1px solid #334155", borderRadius: 8 }} />
                <Bar dataKey="revenue" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Installations per month</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a2238", border: "1px solid #334155", borderRadius: 8 }} />
                <Line type="monotone" dataKey="installs" stroke="#0EA5E9" strokeWidth={3} dot={{ fill: "#0EA5E9", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card lg:col-span-2">
          <h3 className="font-display text-lg font-bold">Capacity by segment</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={segmentMix} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
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
