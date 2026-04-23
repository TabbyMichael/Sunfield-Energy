import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { CustomerOverview } from "@/routes/_app.customer.index";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (config: unknown) => config,
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

vi.mock("recharts", () => {
  const passthrough = ({ children }: { children?: ReactNode }) => <div>{children}</div>;
  return {
    AreaChart: passthrough,
    Area: () => null,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: () => null,
    ResponsiveContainer: passthrough,
  };
});

export function renderCustomerOverview() {
  return render(<CustomerOverview />);
}

