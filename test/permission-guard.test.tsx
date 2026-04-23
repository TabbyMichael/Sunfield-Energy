import { render, screen } from "@testing-library/react";
import { PermissionGuard } from "@/components/guards/RouteGuards";

const mockUseAuth = vi.fn();

vi.mock("@/lib/auth", () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock("@tanstack/react-router", () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate">{to}</div>,
}));

describe("PermissionGuard rendering", () => {
  beforeEach(() => {
    mockUseAuth.mockReset();
  });

  it("redirects to login when user is missing", () => {
    mockUseAuth.mockReturnValue({ user: null });
    render(<PermissionGuard permission="quotes:view_all">secure content</PermissionGuard>);
    expect(screen.getByTestId("navigate")).toHaveTextContent("/login");
  });

  it("renders children when permission is granted", () => {
    mockUseAuth.mockReturnValue({ user: { role: "admin" } });
    render(<PermissionGuard permission="quotes:view_all">secure content</PermissionGuard>);
    expect(screen.getByText("secure content")).toBeInTheDocument();
  });

  it("renders default restricted view for missing permission", () => {
    mockUseAuth.mockReturnValue({ user: { role: "customer" } });
    render(<PermissionGuard permission="quotes:view_all">secure content</PermissionGuard>);
    expect(screen.getByText("Access restricted")).toBeInTheDocument();
    expect(screen.getByText(/quotes:view_all/)).toBeInTheDocument();
  });

  it("renders fallback for missing permission when provided", () => {
    mockUseAuth.mockReturnValue({ user: { role: "customer" } });
    render(<PermissionGuard permission="quotes:view_all" fallback={<div>custom restricted</div>}>secure content</PermissionGuard>);
    expect(screen.getByText("custom restricted")).toBeInTheDocument();
  });
});

