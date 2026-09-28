import { test, expect } from "@playwright/test";

test("Kitchen is disabled and marked Coming Soon", async ({ page }) => {
  await page.goto("/create");

  const kitchenButton = page.getByRole("button", { name: /Kitchen/ });

  await expect(kitchenButton).toBeVisible();
  await expect(kitchenButton).toBeDisabled();

  await expect(page.getByText("Coming Soon")).toBeVisible();
});
