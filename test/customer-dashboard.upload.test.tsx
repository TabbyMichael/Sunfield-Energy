import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderCustomerOverview } from "./helpers/customer-dashboard-render";

describe("Customer dashboard upload", () => {
  it("supports selecting a customer photo file", async () => {
    const user = userEvent.setup();
    renderCustomerOverview();

    const fileInput = screen.getByLabelText(/Add Photo/i) as HTMLInputElement;
    const file = new File(["sample-image"], "roof-photo.png", { type: "image/png" });

    await user.upload(fileInput, file);

    expect(fileInput.files).toHaveLength(1);
    expect(fileInput.files?.[0]?.name).toBe("roof-photo.png");
  });
});

