import { Outlet, Link } from "@tanstack/react-router";
import { Sun } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-energy p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
        <Link to="/" className="relative flex items-center gap-2 text-secondary-foreground">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-foreground/10 backdrop-blur">
            <Sun className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold">SolarFlow</span>
        </Link>
        <div className="relative space-y-4 text-secondary-foreground">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Sunlight, captured.<br />Power, delivered.
          </h2>
          <p className="max-w-md opacity-90">
            One platform for solar leads, quotes, installations, and energy performance —
            built for installers, customers, and operators.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <Outlet />
      </div>
    </div>
  );
}
