import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader } from "@/components/dashboard/Shared";
import { Package, Sun, Battery, Zap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/admin/products")({
  component: () => (
    <RoleGuard allowed={["admin"]}>
      <ProductsPage />
    </RoleGuard>
  ),
});

const products = [
  { name: "Jinko Tiger Neo 580W", category: "Panel", icon: Sun, sku: "JKM-580N", price: 230, stock: 1240 },
  { name: "Canadian Solar 550W", category: "Panel", icon: Sun, sku: "CS-550M", price: 215, stock: 860 },
  { name: "Sungrow SG250HX", category: "Inverter", icon: Zap, sku: "SG-250HX", price: 6800, stock: 14 },
  { name: "Deye SUN-12K Hybrid", category: "Inverter", icon: Zap, sku: "DY-12K", price: 1850, stock: 32 },
  { name: "Pylontech US3000C 3.5kWh", category: "Battery", icon: Battery, sku: "PT-3000C", price: 1450, stock: 56 },
  { name: "BYD Battery-Box Premium 10kWh", category: "Battery", icon: Battery, sku: "BYD-10K", price: 4200, stock: 18 },
];

function ProductsPage() {
  return (
    <div>
      <PageHeader
        title="Solar Products"
        description="Catalog of panels, inverters, and batteries used in quotes."
        actions={
          <Button className="bg-gradient-solar text-primary-foreground hover:opacity-90">
            <Plus className="mr-1 h-4 w-4" /> Add product
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.sku} className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-solar">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {p.category}
                </span>
              </div>
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <div className="mt-1 text-xs text-muted-foreground">SKU: {p.sku}</div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Unit price</div>
                  <div className="font-display text-xl font-bold">${p.price.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">In stock</div>
                  <div className="font-display text-xl font-bold">{p.stock}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
