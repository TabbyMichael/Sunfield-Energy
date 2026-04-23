import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { useState } from "react";
import { Plus, ShoppingCart, User, CreditCard, ClipboardCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Re-defining mock data locally since we can't import from ignored lib/mock-data
const INITIAL_ORDERS = [
  { id: "ORD-7214", customer: "Zara Bello", status: "In Progress", progress: 65, total: 12400, assignedTo: "Alpha Crew" },
  { id: "ORD-7198", customer: "Ibrahim Musa", status: "Pending", progress: 0, total: 8600, assignedTo: "Unassigned" },
  { id: "ORD-7155", customer: "Kwame Nkrumah", status: "Completed", progress: 100, total: 15200, assignedTo: "Beta Crew" },
  { id: "ORD-7102", customer: "Fatima Yusuf", status: "In Progress", progress: 30, total: 21000, assignedTo: "Gamma Crew" },
];

export const Route = createFileRoute("/_app/admin/orders")({
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const [ordersList, setOrdersList] = useState(INITIAL_ORDERS);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer: "",
    total: "",
    assignedTo: "Unassigned",
    status: "Pending"
  });

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer || !formData.total) {
      toast.error("Please fill in essential fields");
      return;
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData.customer,
      status: formData.status,
      progress: formData.status === "Completed" ? 100 : formData.status === "In Progress" ? 25 : 0,
      total: parseFloat(formData.total),
      assignedTo: formData.assignedTo
    };

    setOrdersList([newOrder, ...ordersList]);
    setIsOpen(false);
    setFormData({ customer: "", total: "", assignedTo: "Unassigned", status: "Pending" });
    toast.success(`Order created for ${formData.customer}`);
  };

  return (
    <div>
      <PageHeader 
        title="Orders" 
        description="Track every order from procurement to completion." 
        actions={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-solar text-primary-foreground hover:opacity-90">
                <Plus className="mr-1 h-4 w-4" /> New order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddOrder}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    Create New Order
                  </DialogTitle>
                  <DialogDescription>
                    Manually create a new solar installation order.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer" className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground" /> Customer Name
                    </Label>
                    <Input
                      id="customer"
                      placeholder="e.g. John Doe"
                      value={formData.customer}
                      onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="total" className="flex items-center gap-2">
                      <CreditCard className="h-3.5 w-3.5 text-muted-foreground" /> Order Total ($)
                    </Label>
                    <Input
                      id="total"
                      type="number"
                      placeholder="0.00"
                      value={formData.total}
                      onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status" className="flex items-center gap-2">
                      <ClipboardCheck className="h-3.5 w-3.5 text-muted-foreground" /> Initial Status
                    </Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(v) => setFormData({ ...formData, status: v })}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="crew" className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" /> Assign Crew
                    </Label>
                    <Select 
                      value={formData.assignedTo} 
                      onValueChange={(v) => setFormData({ ...formData, assignedTo: v })}
                    >
                      <SelectTrigger id="crew">
                        <SelectValue placeholder="Assign a crew" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unassigned">Leave Unassigned</SelectItem>
                        <SelectItem value="Alpha Crew">Alpha Crew</SelectItem>
                        <SelectItem value="Beta Crew">Beta Crew</SelectItem>
                        <SelectItem value="Gamma Crew">Gamma Crew</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-solar text-primary-foreground">
                    Create Order
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-background/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Progress</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Crew</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((o) => (
              <tr key={o.id} className="border-b border-border/40 last:border-0 hover:bg-background/30">
                <td className="px-5 py-4 font-mono text-xs">{o.id}</td>
                <td className="px-5 py-4 font-medium">{o.customer}</td>
                <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                <td className="px-5 py-4 w-48">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-solar" style={{ width: `${o.progress}%` }} />
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{o.progress}%</div>
                </td>
                <td className="px-5 py-4 font-semibold">${o.total.toLocaleString()}</td>
                <td className="px-5 py-4 text-muted-foreground">{o.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
