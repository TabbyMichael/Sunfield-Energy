import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AUTH_STORAGE_KEY, renderAuthHarness } from "./helpers/auth-harness";

describe("AuthProvider login flow", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("logs in customer and persists session", async () => {
    const user = userEvent.setup();
    renderAuthHarness();

    await user.click(screen.getByRole("button", { name: "customer-login" }));

    await waitFor(() => {
      expect(screen.getByTestId("auth-state")).toHaveTextContent("authenticated");
    });
    expect(screen.getByTestId("user-name")).toHaveTextContent("Zara Bello");
    expect(screen.getByTestId("user-role")).toHaveTextContent("customer");
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toContain('"role":"customer"');
  });
});

