import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader } from "@/components/dashboard/Shared";
import { useState } from "react";
import { Sun, Battery, Zap, TrendingUp, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_app/staff/quotes")({
  component: () => (
    <RoleGuard allowed={["staff", "admin"]}>
      <QuoteBuilderPage />
    </RoleGuard>
  ),
});

const inverters = [
  { name: "Deye SUN-8K Hybrid", price: 1450, kw: 8 },
  { name: "Sungrow SG50CX", price: 4200, kw: 50 },
  { name: "Huawei SUN2000-100KTL", price: 7800, kw: 100 },
  { name: "Sungrow SG250HX", price: 14500, kw: 250 },
];

function QuoteBuilderPage() {
  const [customer, setCustomer] = useState({ name: "Bright Mall Group", email: "ops@brightmall.io", monthlyBill: 580000 });
  const [system, setSystem] = useState({ panels: 160, panelWatt: 580, inverterIdx: 1, batteryKwh: 30 });

  const systemKw = (system.panels * system.panelWatt) / 1000;
  const inverter = inverters[system.inverterIdx];
  const panelCost = system.panels * 220;
  const batteryCost = system.batteryKwh * 350;
  const installCost = systemKw * 180;
  const total = panelCost + inverter.price + batteryCost + installCost;
  const monthlySavings = customer.monthlyBill * 0.78;
  const annualSavings = monthlySavings * 12;
  const roiYears = (total * 600) / annualSavings; // rough

  return (
    <div>
      <PageHeader
        title="Quote Builder"
        description="Configure a solar system and see live pricing."
        actions={
          <div className="flex gap-2">
            <Button variant="outline"><Save className="mr-1 h-4 w-4" /> Save draft</Button>
            <Button className="bg-gradient-solar text-primary-foreground hover:opacity-90"><Send className="mr-1 h-4 w-4" /> Send quote</Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT: Customer + needs */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <h3 className="font-display text-lg font-bold">Customer</h3>
            <div className="mt-4 space-y-4">
              <div><Label>Name</Label><Input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></div>
              <div><Label>Email</Label><Input value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} /></div>
              <div><Label>Monthly bill (₦)</Label>
                <Input type="number" value={customer.monthlyBill} onChange={(e) => setCustomer({ ...customer, monthlyBill: Number(e.target.value) })} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <h3 className="font-display text-lg font-bold">Energy profile</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-border/60 bg-background p-3">
                <div className="text-xs text-muted-foreground">Daily consumption</div>
                <div className="font-display text-xl font-bold">{Math.round(customer.monthlyBill / 6500 / 30 * 100)} kWh</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-background p-3">
                <div className="text-xs text-muted-foreground">Peak load (est.)</div>
                <div className="font-display text-xl font-bold">{Math.round(systemKw * 0.85)} kW</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-background p-3">
                <div className="text-xs text-muted-foreground">Solar irradiance</div>
                <div className="font-display text-xl font-bold">5.4 h/day</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-background p-3">
                <div className="text-xs text-muted-foreground">Roof area needed</div>
                <div className="font-display text-xl font-bold">{Math.round(systemKw * 6)} m²</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: System + price */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
            <h3 className="font-display text-lg font-bold">System configuration</h3>

            <div className="mt-5 space-y-5">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <Label className="flex items-center gap-2"><Sun className="h-4 w-4 text-primary" /> Panels: {system.panels}</Label>
                  <span className="font-mono text-xs text-muted-foreground">{systemKw.toFixed(1)} kW</span>
                </div>
                <input type="range" min={4} max={1000} step={2} value={system.panels} onChange={(e) => setSystem({ ...system, panels: Number(e.target.value) })} className="w-full accent-primary" />
              </div>

              <div>
                <Label className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Inverter</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {inverters.map((inv, i) => (
                    <button
                      key={inv.name}
                      onClick={() => setSystem({ ...system, inverterIdx: i })}
                      className={`rounded-lg border p-3 text-left text-xs ${
                        system.inverterIdx === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/60 hover:border-border"
                      }`}
                    >
                      <div className="font-semibold">{inv.name}</div>
                      <div className="text-muted-foreground">${inv.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <Label className="flex items-center gap-2"><Battery className="h-4 w-4 text-primary" /> Battery storage</Label>
                  <span className="font-mono text-xs text-muted-foreground">{system.batteryKwh} kWh</span>
                </div>
                <input type="range" min={0} max={200} step={5} value={system.batteryKwh} onChange={(e) => setSystem({ ...system, batteryKwh: Number(e.target.value) })} className="w-full accent-primary" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-secondary/5 p-6 shadow-glow">
            <div className="text-xs uppercase tracking-wider text-primary">Live total</div>
            <div className="mt-1 font-display text-5xl font-bold text-gradient-solar">
              ${total.toLocaleString()}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg bg-background/40 p-3">
                <div className="text-xs text-muted-foreground">Panels</div>
                <div className="font-semibold">${panelCost.toLocaleString()}</div>
              </div>
              <div className="rounded-lg bg-background/40 p-3">
                <div className="text-xs text-muted-foreground">Inverter</div>
                <div className="font-semibold">${inverter.price.toLocaleString()}</div>
              </div>
              <div className="rounded-lg bg-background/40 p-3">
                <div className="text-xs text-muted-foreground">Battery</div>
                <div className="font-semibold">${batteryCost.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-border/40 pt-5 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">Estimated ROI:</span>
              <span className="font-bold text-success">{roiYears.toFixed(1)} years</span>
              <span className="ml-auto text-muted-foreground">~₦{Math.round(monthlySavings).toLocaleString()}/mo saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
