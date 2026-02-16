import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("given: a user visits the home page, should: display the welcome message", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toBeVisible();
  });
});
