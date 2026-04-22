import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth";
import { roleHomePath } from "@/lib/rbac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SolarFlow" },
      { name: "description", content: "Sign in to your SolarFlow account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, loginAs } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const u = await login(email, password);
      navigate({ to: roleHomePath[u.role] as "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role: typeof DEMO_CREDENTIALS[number]["role"]) => {
    const u = loginAs(role);
    navigate({ to: roleHomePath[u.role] as "/" });
  };

  return (
    <div className="w-full max-w-md">
      <Link to="/" className="lg:hidden mb-8 inline-flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-solar">
          <Sun className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-display text-lg font-bold">SolarFlow</span>
      </Link>

      <h1 className="font-display text-4xl font-bold">Welcome back</h1>
      <p className="mt-2 text-muted-foreground">Sign in to your SolarFlow workspace</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@solarflow.io" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        {error && <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}
        <Button type="submit" disabled={loading} className="w-full bg-gradient-solar text-primary-foreground shadow-glow hover:opacity-90">
          {loading ? "Signing in…" : "Sign in"} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/60" /></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Demo accounts</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {DEMO_CREDENTIALS.map((d) => (
            <button
              key={d.role}
              type="button"
              onClick={() => quickLogin(d.role)}
              className="rounded-lg border border-border/60 bg-surface p-3 text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors"
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Click any role to instantly sign in (demo)
        </p>
      </div>
    </div>
  );
}
