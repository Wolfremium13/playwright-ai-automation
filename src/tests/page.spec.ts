import { test, expect } from "@playwright/test";

test.describe("Page should", async () => {
  test("had author name", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Kevin Hierro/);
  });

  test("be able to search", async ({ page }) => {
    await page.goto("/");

    const searchInput = "body > div > nav > div > div > div > input";
    await page.fill(searchInput, "test");

    const postResults = await page.$("body > div > nav > div > div > ul");

    await expect(postResults).not.toBeNull();
  });
});
