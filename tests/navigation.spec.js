import { test, expect } from "@playwright/test";

test("User can navigate to Home", async ({ page }) => {
  await page.goto("/explore");

  const navbar = page.locator("#navbarMenu");

  await navbar.getByRole("link", { name: "Home" }).click();

  await expect(page).toHaveURL("/");
});

test("User can navigate to Explore", async ({ page }) => {
  await page.goto("/");

  const navbar = page.locator("#navbarMenu");

  await navbar.getByRole("link", { name: "Explore" }).click();

  await expect(page).toHaveURL("/explore");
});

test("User can navigate to Create", async ({ page }) => {
  await page.goto("/");

  const navbar = page.locator("#navbarMenu");

  await navbar.getByRole("link", { name: "Create" }).click();

  await expect(page).toHaveURL("/create");

  await expect(
    page.getByRole("heading", { name: "Create Your Space" }),
  ).toBeVisible();
});

test("User can navigate to Contact", async ({ page }) => {
  await page.goto("/");

  const navbar = page.locator("#navbarMenu");

  await navbar.getByRole("link", { name: "Contact" }).click();

  await expect(page).toHaveURL("/contact");
});
