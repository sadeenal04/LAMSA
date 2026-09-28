import { test, expect } from "@playwright/test";

test("Design Studio shows furniture options based on selected style", async ({
  page,
}) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await expect(page.getByText("Available Items")).toBeVisible();
  await expect(page.getByText("Selected: None")).toBeVisible();
  await expect(page.getByText("Style: Modern")).toBeVisible();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  await expect(
    page.getByRole("heading", { name: "Choose Sofa" }),
  ).toBeVisible();
});

test("User can add furniture to the design", async ({ page }) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  await expect(
    page.getByRole("heading", { name: "Choose Sofa" }),
  ).toBeVisible();

  const sofaOption = page.locator(".options-list button").first();
  await sofaOption.click();

  await expect(page.getByRole("button", { name: "Rotate left" })).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Rotate right" }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Delete furniture" }),
  ).toBeVisible();
});

test("User can delete selected furniture", async ({ page }) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  const sofaOption = page.locator(".options-list button").first();
  await sofaOption.click();

  const deleteButton = page.getByRole("button", {
    name: "Delete furniture",
  });

  await expect(deleteButton).toBeVisible();

  await deleteButton.click();

  await expect(deleteButton).not.toBeVisible();
});

test("User can duplicate selected furniture", async ({ page }) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  const sofaOption = page.locator(".options-list button").first();
  await sofaOption.click();

  const duplicateButton = page.getByRole("button", {
    name: "Duplicate furniture",
  });

  await expect(duplicateButton).toBeVisible();

  await duplicateButton.click();

  await expect(
    page.getByRole("button", { name: "Delete furniture" }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Duplicate furniture" }),
  ).toBeVisible();
});

test("User can rotate selected furniture", async ({ page }) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  const sofaOption = page.locator(".options-list button").first();
  await sofaOption.click();

  const rotateLeftButton = page.getByRole("button", {
    name: "Rotate left",
  });

  const rotateRightButton = page.getByRole("button", {
    name: "Rotate right",
  });

  await expect(rotateLeftButton).toBeVisible();
  await expect(rotateRightButton).toBeVisible();

  await rotateLeftButton.click();
  await rotateRightButton.click();
});

test("User can resize selected furniture", async ({ page }) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  const sofaOption = page.locator(".options-list button").first();
  await sofaOption.click();

  const decreaseButton = page.getByRole("button", {
    name: "Decrease size",
  });

  const increaseButton = page.getByRole("button", {
    name: "Increase size",
  });

  await expect(decreaseButton).toBeVisible();
  await expect(increaseButton).toBeVisible();

  await decreaseButton.click();
  await increaseButton.click();
});

test("User can change furniture color", async ({ page }) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  const sofaOption = page.locator(".options-list button").first();
  await sofaOption.click();

  const colorPicker = page.locator('input[type="color"]');

  await expect(colorPicker).toBeVisible();

  await colorPicker.fill("#ff0000");

  await expect(colorPicker).toHaveValue("#ff0000");
});
test("User can reset the design", async ({ page }) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  const sofaOption = page.locator(".options-list button").first();
  await sofaOption.click();

  await expect(
    page.getByRole("button", { name: "Delete furniture" }),
  ).toBeVisible();

  const resetButton = page.getByRole("button", {
    name: "Reset",
  });

  await expect(resetButton).toBeVisible();

  await resetButton.click();

  await expect(
    page.getByRole("button", { name: "Delete furniture" }),
  ).not.toBeVisible();
});

test("User can reset a design with multiple furniture items", async ({
  page,
}) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  await page.getByRole("button", { name: "Sofa", exact: true }).click();

  const sofaOption = page.locator(".options-list button").first();
  await sofaOption.click();

  await page.getByRole("button", { name: "Duplicate furniture" }).click();

  await expect(
    page.getByRole("button", { name: "Delete furniture" }),
  ).toBeVisible();

  const resetButton = page.getByRole("button", {
    name: "Reset",
  });

  await resetButton.click();

  await expect(
    page.getByRole("button", { name: "Delete furniture" }),
  ).not.toBeVisible();
});
test("User can download the design", async ({ page }) => {
  await page.goto("/create");

  await page.getByRole("button", { name: "Living Room" }).click();
  await page.getByRole("button", { name: "Modern" }).click();
  await page.getByRole("button", { name: "Start Designing" }).click();

  const downloadButton = page.getByRole("button", {
    name: "Download",
  });

  await expect(downloadButton).toBeVisible();

  const downloadPromise = page.waitForEvent("download");

  await downloadButton.click();

  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("lamsa-design.png");
});
