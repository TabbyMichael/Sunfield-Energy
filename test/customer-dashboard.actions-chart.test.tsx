import { screen } from "@testing-library/react";
import { renderCustomerOverview } from "./helpers/customer-dashboard-render";

describe("Customer dashboard actions and chart", () => {
  it("renders Snapchat-style quick action buttons", () => {
    renderCustomerOverview();
    expect(screen.getByRole("button", { name: "Story Frame" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Snap Vibe" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Photo Drop" })).toBeInTheDocument();
  });

  it("keeps energy production chart section visible", () => {
    renderCustomerOverview();
    expect(screen.getByRole("heading", { name: /Energy production this week/i })).toBeInTheDocument();
  });
});

