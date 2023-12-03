import { test, expect } from "@playwright/test";
import { auto } from "auto-playwright";

test.describe("Page should", async () => {
  const options = {
    // The OpenAI model (https://platform.openai.com/docs/models/overview)
    debug: true,
    model: "gpt-3.5-turbo",
  };
  test("be able to search using AI", async ({ page }) => {
    test.setTimeout(120000);
    await page.goto("/");
    await auto(
      "Action with no result: Fill the search input with the place holder `Buscar posts...` using the value `test`",
      { page },
      options
    );

    const postResults = await auto(
      "Query: We need to wait 3 seconds for the results and then the DOM will display the links, give me the number of them",
      { page },
      options
    );
    await expect(parseInt(postResults.query)).toBeGreaterThan(1);
  });

  test("be able to search", async ({ page }) => {
    await page.goto("/");

    const searchInput = "body > div > nav > div > div > div > input";
    await page.fill(searchInput, "test");

    const postResults = await page.$("body > div > nav > div > div > ul");

    await expect(postResults).not.toBeNull();
  });
});
