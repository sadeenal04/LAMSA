import { test, expect } from "@playwright/test";

test("Create page displays spaces and styles", async ({ page }) => {
  await page.goto("/create");

  await expect(
    page.getByRole("heading", { name: "Create Your Space" }),
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Living Room" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Bedroom" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Kitchen" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Bathroom" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Office" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "My Own Space" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Choose Your Style" }),
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Modern" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Classic" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Bohemian" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Industrial" })).toBeVisible();
});
