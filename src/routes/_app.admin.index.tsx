import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatCard } from "@/components/dashboard/Shared";
import DashboardMap from "@/components/dashboard/DashboardMap";
import { DollarSign, Users, Wrench, TrendingUp, Sun, MapPin } from "lucide-react";
import { analyticsRevenue, installationMapLocations, segmentMix } from "@/lib/mock-data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_app/admin/")({
  component: AdminOverview,
});

const COLORS = ["#F59E0B", "#0EA5E9", "#10B981"];

function AdminOverview() {
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

      <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Installation Locations
            </h3>
            <p className="text-xs text-muted-foreground">Monitor all active installation sites</p>
          </div>
        </div>
        {loading ? (
          <div className="h-96 flex items-center justify-center text-gray-500">
            Loading map...
          </div>
        ) : (
          <DashboardMap locations={locations} height="500px" />
        )}
      </div>
    </div>
  );
}
