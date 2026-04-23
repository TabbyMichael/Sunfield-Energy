import { screen } from "@testing-library/react";
import { renderAuthHarness } from "./helpers/auth-harness";

describe("AuthProvider initial state", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts unauthenticated with no user loaded", () => {
    renderAuthHarness();

    expect(screen.getByTestId("auth-state")).toHaveTextContent("anonymous");
    expect(screen.getByTestId("user-name")).toHaveTextContent("none");
    expect(screen.getByTestId("user-role")).toHaveTextContent("none");
  });
});

