import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  DashboardSidebar, DashboardTopbar, MobileSidebar,
} from "@/components/navigation/DashboardNav";

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
