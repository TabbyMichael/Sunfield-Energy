import { screen } from "@testing-library/react";
import { renderCustomerOverview } from "./helpers/customer-dashboard-render";

describe("Customer dashboard header and media", () => {
  it("renders greeting and installation CTA", () => {
    renderCustomerOverview();
    expect(screen.getByText("Welcome back, Zara")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Track installation/i })).toHaveAttribute("href", "/customer/installation");
  });

  it("renders media updates section and upload input", () => {
    renderCustomerOverview();
    expect(screen.getByRole("heading", { name: /Project media updates/i })).toBeInTheDocument();

    const fileInput = screen.getByLabelText(/Add Photo/i) as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput.type).toBe("file");
    expect(fileInput.accept).toBe("image/*");
  });
});

