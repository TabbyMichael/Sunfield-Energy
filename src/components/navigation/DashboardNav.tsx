import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { roleHomePath, type Role } from "@/lib/rbac";
import {
  Sun, LayoutDashboard, Users, Shield, Package, FileText, ShoppingCart,
  Wrench, BarChart3, LogOut, Bell, Search, Menu, X, Zap, Home, Receipt, Activity,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavItem {
  to: string;
  label: string;
  icon: typeof Sun;
}

const navByRole: Record<Role, NavItem[]> = {
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/roles", label: "Roles & Permissions", icon: Shield },
    { to: "/admin/products", label: "Solar Products", icon: Package },
    { to: "/admin/quotes", label: "Quotes", icon: FileText },
    { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { to: "/admin/installations", label: "Installations", icon: Wrench },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/admin/notifications", label: "Notifications", icon: Bell },
  ],
  staff: [
    { to: "/staff", label: "Overview", icon: LayoutDashboard },
    { to: "/staff/leads", label: "Leads", icon: Users },
    { to: "/staff/quotes", label: "Quote Builder", icon: FileText },
    { to: "/staff/orders", label: "Assigned Orders", icon: ShoppingCart },
    { to: "/staff/installations", label: "Installations", icon: Wrench },
    { to: "/staff/notifications", label: "Notifications", icon: Bell },
  ],
  customer: [
    { to: "/customer", label: "Overview", icon: Home },
    { to: "/customer/quotes", label: "My Quotes", icon: FileText },
    { to: "/customer/orders", label: "My Orders", icon: Receipt },
    { to: "/customer/installation", label: "Installation Status", icon: Wrench },
    { to: "/customer/savings", label: "Savings Dashboard", icon: Activity },
    { to: "/customer/notifications", label: "Notifications", icon: Bell },
  ],
};

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuth();
  const location = useLocation();
  const items = user ? navByRole[user.role] : [];

  return (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-solar shadow-glow">
          <Sun className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-display text-sm font-bold leading-tight">SolarFlow</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {user?.role} Console
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to !== `/${user?.role}` && location.pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-lg bg-gradient-energy p-3 text-secondary-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="text-xs font-semibold">System Online</span>
          </div>
          <p className="mt-1 text-[11px] opacity-80">All services operational</p>
        </div>
      </div>
    </aside>
  );
}

export function DashboardTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/v1/notifications/unread-count', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUnreadCount(data.count);
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getNotificationsPath = () => {
    if (!user) return '/login';
    return `/${user.role}/notifications`;
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden flex-1 max-w-md sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search quotes, orders, customers…"
            className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Link to={getNotificationsPath()} className="relative">
          <button className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </Link>

        <div className="hidden items-center gap-3 rounded-lg border border-border/60 bg-surface px-3 py-1.5 sm:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-solar text-xs font-bold text-primary-foreground">
            {user?.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold">{user?.name}</div>
            <div className="text-[10px] capitalize text-muted-foreground">{user?.role}</div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            logout();
            navigate({ to: "/login" });
          }}
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-64">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded-md p-2 text-muted-foreground hover:bg-muted"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        <DashboardSidebar onNavigate={onClose} />
      </div>
    </div>
  );
}

export { roleHomePath };
