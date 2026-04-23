import { useState } from "react";
import { render } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/lib/auth";

export const AUTH_STORAGE_KEY = "solarflow.auth.user";

function AuthHarness() {
  const { user, isAuthenticated, login, loginAs, logout } = useAuth();
  const [error, setError] = useState("");

  const runInvalidLogin = async () => {
    try {
      await login("unknown@solarflow.io", "bad-password");
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const runCustomerLogin = async () => {
    await login("customer@solarflow.io", "demo");
    setError("");
  };

  return (
    <div>
      <div data-testid="auth-state">{isAuthenticated ? "authenticated" : "anonymous"}</div>
      <div data-testid="user-name">{user?.name ?? "none"}</div>
      <div data-testid="user-role">{user?.role ?? "none"}</div>
      <div data-testid="error-message">{error || "none"}</div>
      <button type="button" onClick={runInvalidLogin}>invalid-login</button>
      <button type="button" onClick={runCustomerLogin}>customer-login</button>
      <button type="button" onClick={() => loginAs("staff")}>login-as-staff</button>
      <button type="button" onClick={logout}>logout</button>
    </div>
  );
}

export function renderAuthHarness() {
  return render(
    <AuthProvider>
      <AuthHarness />
    </AuthProvider>,
  );
}

