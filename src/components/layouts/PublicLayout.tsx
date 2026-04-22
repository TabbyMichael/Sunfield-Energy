import { Outlet } from "@tanstack/react-router";
import { PublicHeader, PublicFooter } from "@/components/navigation/PublicNav";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
