import { describe, expect, it } from "vitest";
import { hasPermission, hasRole, roleHomePath, rolePermissions, type Permission, type Role } from "@/lib/rbac";

describe("rbac permission matrix", () => {
  const adminOnly: Permission[] = ["users:manage", "roles:manage", "products:manage", "analytics:view"];
  const staffOnly: Permission[] = ["orders:view_assigned", "installations:view_assigned"];
  const customerOnly: Permission[] = ["quotes:view_own", "orders:view_own", "installations:view_own"];

  it("keeps admin-only permissions restricted", () => {
    for (const permission of adminOnly) {
      expect(hasPermission("admin", permission)).toBe(true);
      expect(hasPermission("staff", permission)).toBe(false);
      expect(hasPermission("customer", permission)).toBe(false);
    }
  });

  it("keeps staff-only permissions restricted", () => {
    for (const permission of staffOnly) {
      expect(hasPermission("staff", permission)).toBe(true);
      expect(hasPermission("customer", permission)).toBe(false);
    }
  });

  it("keeps customer-only permissions restricted", () => {
    for (const permission of customerOnly) {
      expect(hasPermission("customer", permission)).toBe(true);
      expect(hasPermission("admin", permission)).toBe(false);
      expect(hasPermission("staff", permission)).toBe(false);
    }
  });

  it("returns false for undefined roles in role and permission checks", () => {
    expect(hasPermission(undefined, "quotes:view_all")).toBe(false);
    expect(hasRole(undefined, ["admin", "staff"])).toBe(false);
  });

  it("validates role checks and home paths", () => {
    const allRoles: Role[] = ["admin", "staff", "customer"];
    for (const role of allRoles) {
      expect(hasRole(role, [role])).toBe(true);
      expect(roleHomePath[role]).toMatch(/^\/(admin|staff|customer)$/);
      expect(rolePermissions[role].length).toBeGreaterThan(0);
    }
  });
});

