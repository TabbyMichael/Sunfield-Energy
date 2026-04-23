import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AUTH_STORAGE_KEY, renderAuthHarness } from "./helpers/auth-harness";

describe("AuthProvider error and logout", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows a clear error on invalid login", async () => {
    const user = userEvent.setup();
    renderAuthHarness();

    await user.click(screen.getByRole("button", { name: "invalid-login" }));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).not.toHaveTextContent("none");
    });
    expect(screen.getByTestId("error-message")).toHaveTextContent("Invalid credentials");
    expect(screen.getByTestId("auth-state")).toHaveTextContent("anonymous");
  });

  it("supports role switch and logout cleanup", async () => {
    const user = userEvent.setup();
    renderAuthHarness();

    await user.click(screen.getByRole("button", { name: "login-as-staff" }));
    await waitFor(() => {
      expect(screen.getByTestId("user-role")).toHaveTextContent("staff");
    });

    await user.click(screen.getByRole("button", { name: "logout" }));
    await waitFor(() => {
      expect(screen.getByTestId("auth-state")).toHaveTextContent("anonymous");
    });
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });
});

