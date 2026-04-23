import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/dashboard/Shared";
import { Activity, DollarSign, Wrench, Leaf, ArrowRight } from "lucide-react";
import { energyProduction } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/customer/")({
  component: CustomerOverview,
});

function CustomerOverview() {
  return (
    <div>
      <PageHeader
        title="Welcome back, Zara"
        description="Your solar system at a glance."
        actions={
          <Link to="/customer/installation">
            <Button variant="outline">Track installation <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="System status" value="Online" delta="All systems normal" icon={Activity} accent="success" />
        <StatCard label="Today's production" value="48 kWh" delta="+12% vs avg" icon={Wrench} accent="primary" />
        <StatCard label="Monthly savings" value="₦78,400" delta="Locked in" icon={DollarSign} accent="secondary" />
        <StatCard label="CO₂ avoided" value="1.4 t" delta="This year" icon={Leaf} accent="success" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Energy production this week</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyProduction}>
                <defs>
                  <linearGradient id="prod" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a2238", border: "1px solid #334155", borderRadius: 8 }} />
                <Area type="monotone" dataKey="kwh" stroke="#0EA5E9" strokeWidth={2} fill="url(#prod)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
          <h3 className="font-display text-lg font-bold">Your system</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Capacity</dt><dd className="font-semibold">8 kW</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Panels</dt><dd className="font-semibold">16 × 500W</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Inverter</dt><dd className="font-semibold">Deye 8K Hybrid</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Battery</dt><dd className="font-semibold">10 kWh</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Installed</dt><dd className="font-semibold">Apr 2025</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Warranty</dt><dd className="font-semibold text-success">25 years</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}
