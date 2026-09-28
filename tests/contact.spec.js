import { test, expect } from "@playwright/test";

test("User can submit the contact form", async ({ page }) => {
  await page.goto("/contact");

  await expect(
    page.getByRole("heading", { name: "Get in Touch" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Send us a message" }),
  ).toBeVisible();

  await page.getByLabel("Name").fill("Sadeen");

  await page.getByLabel("Email").fill("sadeen@example.com");

  await page.getByLabel("Message").fill("Hello from LAMSA!");

  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(
    page.getByText("Thank you! Your message has been received."),
  ).toBeVisible();

  await expect(page.getByLabel("Name")).toHaveValue("");
  await expect(page.getByLabel("Email")).toHaveValue("");
  await expect(page.getByLabel("Message")).toHaveValue("");
});
