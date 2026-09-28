import { test, expect } from "@playwright/test";

test("User can start designing after selecting a space and style", async ({
  page,
}) => {
  await page.goto("/create");

  const startDesigningButton = page.getByRole("button", {
    name: "Start Designing",
  });

  await expect(startDesigningButton).toBeDisabled();

  await page.getByRole("button", { name: "Living Room" }).click();

  await page.getByRole("button", { name: "Modern" }).click();

  await expect(startDesigningButton).toBeEnabled();

  await startDesigningButton.click();

  await expect(page).toHaveURL(/\/create\/design/);
});
