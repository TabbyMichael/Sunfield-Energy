import { Link, useLocation } from "@tanstack/react-router";
import { Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/solutions/industrial", label: "Industrial" },
  { to: "/solutions/commercial", label: "Commercial" },
  { to: "/solutions/residential", label: "Residential" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-solar shadow-glow">
            <Sun className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">SolarFlow</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/quote">
            <Button size="sm" className="bg-gradient-solar text-primary-foreground hover:opacity-90 shadow-glow">
              Get a Quote
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 px-4 py-4 space-y-1 bg-background">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)} className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start">Sign in</Button>
          </Link>
          <Link to="/quote" onClick={() => setOpen(false)} className="block">
            <Button size="sm" className="w-full bg-gradient-solar text-primary-foreground">Get a Quote</Button>
          </Link>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border/40 bg-sidebar mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-solar">
                <Sun className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">SolarFlow</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Powering Africa with intelligent solar systems for homes, businesses, and industry.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Solutions</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/solutions/industrial" className="hover:text-foreground">Industrial</Link></li>
              <li><Link to="/solutions/commercial" className="hover:text-foreground">Commercial</Link></li>
              <li><Link to="/solutions/residential" className="hover:text-foreground">Residential</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/quote" className="hover:text-foreground">Get a Quote</Link></li>
              <li><Link to="/login" className="hover:text-foreground">Customer Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} SolarFlow Energy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
