import { render, screen } from "@testing-library/react";
import { RoleGuard } from "@/components/guards/RouteGuards";

const mockUseAuth = vi.fn();

vi.mock("@/lib/auth", () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock("@tanstack/react-router", () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate">{to}</div>,
}));

describe("RoleGuard rendering", () => {
  beforeEach(() => {
    mockUseAuth.mockReset();
  });

  it("redirects to login when user is missing", () => {
    mockUseAuth.mockReturnValue({ user: null });
    render(<RoleGuard allowed={["customer"]}>secure content</RoleGuard>);
    expect(screen.getByTestId("navigate")).toHaveTextContent("/login");
  });

  it("renders children when role is allowed", () => {
    mockUseAuth.mockReturnValue({ user: { role: "customer" } });
    render(<RoleGuard allowed={["customer"]}>secure content</RoleGuard>);
    expect(screen.getByText("secure content")).toBeInTheDocument();
  });

  it("renders default access denied for disallowed role", () => {
    mockUseAuth.mockReturnValue({ user: { role: "staff" } });
    render(<RoleGuard allowed={["customer"]}>secure content</RoleGuard>);
    expect(screen.getByText("Access denied")).toBeInTheDocument();
    expect(screen.getByText(/Your role \(staff\)/)).toBeInTheDocument();
  });

  it("renders fallback for disallowed role when provided", () => {
    mockUseAuth.mockReturnValue({ user: { role: "staff" } });
    render(<RoleGuard allowed={["customer"]} fallback={<div>custom denied</div>}>secure content</RoleGuard>);
    expect(screen.getByText("custom denied")).toBeInTheDocument();
  });
});

