import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatCard } from "@/components/dashboard/Shared";
import { DollarSign, Leaf, Zap, TrendingUp } from "lucide-react";
import { energyProduction } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/_app/customer/savings")({
  component: SavingsPage,
});

const monthly = [
  { month: "Nov", saved: 62000, generated: 1180 },
  { month: "Dec", saved: 68000, generated: 1240 },
  { month: "Jan", saved: 71000, generated: 1310 },
  { month: "Feb", saved: 69500, generated: 1290 },
  { month: "Mar", saved: 76200, generated: 1380 },
  { month: "Apr", saved: 78400, generated: 1420 },
];

function SavingsPage() {
  return (
    <div>
      <PageHeader title="Savings Dashboard" description="See exactly how much you're earning back." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Lifetime savings" value="₦425K" delta="+₦78K this month" icon={DollarSign} accent="primary" />
        <StatCard label="Energy generated" value="7.8 MWh" delta="6 month total" icon={Zap} accent="secondary" />
        <StatCard label="CO₂ avoided" value="3.2 tons" delta="= 53 trees planted" icon={Leaf} accent="success" />
        <StatCard label="Payback progress" value="14%" delta="On track for 4yr" icon={TrendingUp} accent="primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Monthly savings (₦)</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a2238", border: "1px solid #334155", borderRadius: 8 }} />
                <Bar dataKey="saved" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Daily production this week (kWh)</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyProduction}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a2238", border: "1px solid #334155", borderRadius: 8 }} />
                <Bar dataKey="kwh" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
