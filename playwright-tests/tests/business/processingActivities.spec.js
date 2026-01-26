import { test, expect } from "@playwright/test";
import { ProcessingActivities } from "../../page-objects/ProcessingActivities.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Processing-Activities Page @processing_activities", () => {
  let processingActivities;

  test.beforeEach(async ({ page }) => {
    processingActivities = new ProcessingActivities(page);
  });

  test("processing activities page check one box @processing_activities_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/processing-activities");

    await processingActivities.clickContinue(); // Check feature logic
    await processingActivities.checkVacuumPacking(); // firstCheckbox
    await expect(
      page.locator(processingActivities.selectors.firstCheckbox)
    ).toBeChecked();

    await processingActivities.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*processing-activities/);
  });

  test("processing activities page check all boxes @processing_activities_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/processing-activities");

    await processingActivities.checkVacuumPacking(); // firstCheckbox - #VACUUM_PACKING
    await expect(
      page.locator(processingActivities.selectors.firstCheckbox)
    ).toBeChecked();

    await processingActivities.checkSousVide(); // secondCheckbox - #SOUS_VIDE
    await expect(
      page.locator(processingActivities.selectors.secondCheckbox)
    ).toBeChecked();

    await processingActivities.checkFermenting(); // thirdCheckbox - #FERMENTING_OR_CURING
    await expect(
      page.locator(processingActivities.selectors.thirdCheckbox)
    ).toBeChecked();

    await processingActivities.checkPasteurising(); // fourthCheckbox - #PASTEURISING
    await expect(
      page.locator(processingActivities.selectors.fourthCheckbox)
    ).toBeChecked();

    // Feature checks up to fourthCheckbox only here?
    // "And I click on the element "processingActivities.fourthCheckbox""
    // Then button.

    await processingActivities.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*processing-activities/);
  });

  test("processing activities page check none box @processing_activities_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/processing-activities");

    await processingActivities.clickContinue();
    // Feature uses "fifthCheckbox" for None?
    // Page Object: fifthCheckbox: "#ANIMAL_UNCOOKED", sixthCheckbox: "#REWRAPPING_OR_RELABELLING", seventhCheckbox: "#NONE"
    // But scenario title is "check none box".
    // If fifthCheckbox is ANIMAL_UNCOOKED in Page Object, there is a mismatch.
    // Let's check `src/pageObjects`. Maybe `ProcessingActivities.page.js` was different in legacy?
    // I am using the NEW page object `playwright-tests/page-objects/ProcessingActivities.page.js` which has specific mapping.
    // If the feature file says "fifthCheckbox" and intends "None", then legacy mapping had "None" as fifth?
    // Let's look at `playwright-tests/page-objects/ProcessingActivities.page.js` again.
    /*
      fifthCheckbox: "#ANIMAL_UNCOOKED",
      sixthCheckbox: "#REWRAPPING_OR_RELABELLING",
      seventhCheckbox: "#NONE",
    */
    // If I strictly follow feature "fifthCheckbox", I would check ANIMAL_UNCOOKED.
    // But scenario says "check none box".
    // I will assume the intention (None) overrides the variable name if mappings changed.
    // BUT the variable name `fifthCheckbox` is just a key.
    // If I check `checkNone()` in page object it uses `seventhCheckbox`.
    // I'll stick to the INTENTION of the test: "check none box".
    
    await processingActivities.checkNone(); 
    // Verify checked. Logic in Page object for checkNone uses seventhCheckbox (#NONE).
    await expect(page.locator(processingActivities.selectors.seventhCheckbox)).toBeChecked();

    await processingActivities.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*processing-activities/);
  });

  test("processing activities page check dont know box @processing_activities_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/processing-activities");

    await processingActivities.clickContinue();
    // Feature uses "sixthCheckbox" for Dont Know.
    // Page Object `eigthCheckbox` is Dont Know (#DONT_KNOW).
    // I will use `checkDontKnow()` which maps to correct logic.
    await processingActivities.checkDontKnow();
    await expect(
      page.locator(processingActivities.selectors.eigthCheckbox)
    ).toBeChecked();

    await processingActivities.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*processing-activities/);
  });

  test("processing activities page check check first checkbox is unchecked after dont know checkbox is checked @processing_activities_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/processing-activities");

    await processingActivities.clickContinue();
    await processingActivities.checkVacuumPacking(); // first
    await expect(
      page.locator(processingActivities.selectors.firstCheckbox)
    ).toBeChecked();

    await processingActivities.checkDontKnow(); // eigthCheckbox in PO
    await expect(
      page.locator(processingActivities.selectors.eigthCheckbox)
    ).toBeChecked();
    
    await expect(
      page.locator(processingActivities.selectors.firstCheckbox)
    ).not.toBeChecked();

    await processingActivities.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*processing-activities/);
  });

  test("processing activities page check check first checkbox is unchecked after none checkbox is checked @processing_activities_page_happy", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/processing-activities");

    await processingActivities.clickContinue();
    await processingActivities.checkVacuumPacking();
    await expect(
      page.locator(processingActivities.selectors.firstCheckbox)
    ).toBeChecked();

    await processingActivities.checkNone(); // seventhCheckbox in PO
    await expect(
      page.locator(processingActivities.selectors.seventhCheckbox)
    ).toBeChecked();
    
    await expect(
      page.locator(processingActivities.selectors.firstCheckbox)
    ).not.toBeChecked();

    await processingActivities.clickContinue();
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/.*processing-activities/);
  });

  test("processing activities page check invalid selection @processing_activities_pageS_invalid", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/processing-activities");

    await processingActivities.clickContinue();
    await expect(
      page.locator(processingActivities.selectors.error)
    ).toContainText("Please select all options that apply to your business");
  });
});
