import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/guards/RouteGuards";
import { PageHeader, StatusBadge } from "@/components/dashboard/Shared";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, UserPlus, Mail, Shield, User } from "lucide-react";
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

export const Route = createFileRoute("/_app/admin/users")({
  component: UsersPage,
});

const INITIAL_USERS = [
  { id: "u_1", name: "Amara Okafor", email: "amara@solarflow.io", role: "admin", status: "Accepted", joined: "2024-09-12" },
  { id: "u_2", name: "Daniel Mensah", email: "daniel@solarflow.io", role: "staff", status: "Accepted", joined: "2024-10-04" },
  { id: "u_3", name: "Sade Adebayo", email: "sade@solarflow.io", role: "staff", status: "Accepted", joined: "2024-11-21" },
  { id: "u_4", name: "Zara Bello", email: "zara@example.com", role: "customer", status: "Accepted", joined: "2025-02-18" },
  { id: "u_5", name: "Ibrahim Musa", email: "ibrahim@example.com", role: "customer", status: "Sent", joined: "2025-04-09" },
];

function UsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "staff"
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    const newUser = {
      id: `u_${users.length + 1}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "Sent",
      joined: new Date().toISOString().split('T')[0]
    };

    setUsers([newUser, ...users]);
    setIsInviteOpen(false);
    setFormData({ name: "", email: "", role: "staff" });
    toast.success(`Invitation sent to ${formData.name}`);
  };

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage workspace members and customer accounts."
        actions={
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-solar text-primary-foreground hover:opacity-90">
                <Plus className="mr-1 h-4 w-4" /> Invite user
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleInvite}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Invite User
                  </DialogTitle>
                  <DialogDescription>
                    Send an invitation to join SolarFlow. They will receive an email to set up their account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground" /> Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role" className="flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-muted-foreground" /> System Role
                    </Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(v) => setFormData({ ...formData, role: v })}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="staff">Operations Staff</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-solar text-primary-foreground">
                    Send Invitation
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
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border/40 last:border-0 hover:bg-background/30">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-solar text-xs font-bold text-primary-foreground">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize">
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4"><StatusBadge status={u.status} /></td>
                <td className="px-5 py-4 text-muted-foreground">{u.joined}</td>
                <td className="px-5 py-4 text-right">
                  <button className="rounded-md p-1.5 hover:bg-muted"><MoreVertical className="h-4 w-4 text-muted-foreground" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
