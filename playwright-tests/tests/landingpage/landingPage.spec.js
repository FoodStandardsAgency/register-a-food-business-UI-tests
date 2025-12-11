import { test, expect } from "@playwright/test";
import { openWebsite } from "../../utils/navigation.js";
import { LandingPage } from "../../page-objects/LandingPage.page.js";

test.describe("Landing Page - Begin Registration Flow", () => {
  let landingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await openWebsite(page, "site", "/");
  });

  test("should successfully navigate from landing page to next page when clicking continue button", async ({
    page,
  }) => {
    // Click the "Begin registration" button on the landing page
    await page.getByRole("button", { name: "Begin registration" }).click();

    // Verify we've navigated to the next page (LA selector or new/update registration)
    await expect(page).toHaveURL(/\/(new|la-selector|registration-role)/);
  });

  test("should display the landing page heading correctly", async ({
    page,
  }) => {
    // Verify the landing page is displayed
    const heading = await landingPage.getHeading();
    expect(heading).toBeTruthy();
    expect(heading.length).toBeGreaterThan(0);
  });

  test("should have a visible begin registration button on landing page", async ({
    page,
  }) => {
    // Verify the "Begin registration" button is visible (not the cookie banner button)
    await expect(
      page.getByRole("button", { name: "Begin registration" })
    ).toBeVisible();
  });
});
