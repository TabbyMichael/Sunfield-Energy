import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shared";
import { Package, Sun, Battery, Zap, Plus, Hash, Tag, DollarSign, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/admin/products")({
  component: ProductsPage,
});

const INITIAL_PRODUCTS = [
  { name: "Jinko Tiger Neo 580W", category: "Panel", icon: Sun, sku: "JKM-580N", price: 230, stock: 1240 },
  { name: "Canadian Solar 550W", category: "Panel", icon: Sun, sku: "CS-550M", price: 215, stock: 860 },
  { name: "Sungrow SG250HX", category: "Inverter", icon: Zap, sku: "SG-250HX", price: 6800, stock: 14 },
  { name: "Deye SUN-12K Hybrid", category: "Inverter", icon: Zap, sku: "DY-12K", price: 1850, stock: 32 },
  { name: "Pylontech US3000C 3.5kWh", category: "Battery", icon: Battery, sku: "PT-3000C", price: 1450, stock: 56 },
  { name: "BYD Battery-Box Premium 10kWh", category: "Battery", icon: Battery, sku: "BYD-10K", price: 4200, stock: 18 },
];

function ProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Panel",
    sku: "",
    price: "",
    stock: ""
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku || !formData.price || !formData.stock) {
      toast.error("Please fill in all fields");
      return;
    }

    const icons = {
      Panel: Sun,
      Inverter: Zap,
      Battery: Battery
    };

    const newProduct = {
      name: formData.name,
      category: formData.category as "Panel" | "Inverter" | "Battery",
      icon: icons[formData.category as keyof typeof icons],
      sku: formData.sku,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    setProducts([newProduct, ...products]);
    setIsOpen(false);
    setFormData({ name: "", category: "Panel", sku: "", price: "", stock: "" });
    toast.success(`${formData.name} added to catalog`);
  };

  return (
    <div>
      <PageHeader
        title="Solar Products"
        description="Catalog of panels, inverters, and batteries used in quotes."
        actions={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-solar text-primary-foreground hover:opacity-90">
                <Plus className="mr-1 h-4 w-4" /> Add product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddProduct}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Add New Product
                  </DialogTitle>
                  <DialogDescription>
                    Enter the details for the new solar component.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-muted-foreground" /> Product Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Longi Hi-MO 6"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-muted-foreground" /> Category
                    </Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v) => setFormData({ ...formData, category: v })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Panel">Solar Panel</SelectItem>
                        <SelectItem value="Inverter">Inverter</SelectItem>
                        <SelectItem value="Battery">Battery Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sku" className="flex items-center gap-2">
                      <Hash className="h-3.5 w-3.5 text-muted-foreground" /> SKU
                    </Label>
                    <Input
                      id="sku"
                      placeholder="LR-HM6-580"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price" className="flex items-center gap-2">
                        <DollarSign className="h-3.5 w-3.5 text-muted-foreground" /> Price ($)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stock" className="flex items-center gap-2">
                        <Package className="h-3.5 w-3.5 text-muted-foreground" /> Initial Stock
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-solar text-primary-foreground">
                    Create Product
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
