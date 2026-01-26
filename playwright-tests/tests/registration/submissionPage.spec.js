import { test, expect } from "@playwright/test";
import { SubmissionPage } from "../../page-objects/SubmissionPage.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Submission Page with next steps and links @submission_page", () => {
  let submissionPage;

  test.beforeEach(async ({ page }) => {
    submissionPage = new SubmissionPage(page);
  });

  test("I want to find out about food safety and how to run a food business @SDB-121_food_safety", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/summary-confirmation");

    const link = page.locator(submissionPage.selectors.foodSafetyLink);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.food.gov.uk/register-a-food-business#support-for-new-food-businesses"
    );

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      link.click(),
    ]);
    await newPage.waitForLoadState();
  });

  test("I want to find out about fhrs scores @SDB-121_fhrs_score_score", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/summary-confirmation");

    const link = page.locator(submissionPage.selectors.fhrsScoreLink);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.food.gov.uk/business-guidance/food-hygiene-ratings-for-businesses"
    );

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      link.click(),
    ]);
    await newPage.waitForLoadState();
  });

  test("I want to find out about food labelling and allergens @SDB-121_fhrs_score_labelling", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/summary-confirmation");

    const link = page.locator(submissionPage.selectors.foodLabellingLink);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.food.gov.uk/business-guidance/industry-specific-advice/labelling-and-allergens"
    );

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      link.click(),
    ]);
    await newPage.waitForLoadState();
  });

  test("I want to find out about general guidance on business growth and finance @SDB-121_primary_authority", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/summary-confirmation");

    const link = page.locator(submissionPage.selectors.safetyManagementLink);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.food.gov.uk/business-guidance/safer-food-better-business"
    );

    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      link.click(),
    ]);
    await newPage.waitForLoadState();
  });
});
