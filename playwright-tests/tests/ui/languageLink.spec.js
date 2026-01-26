import { test, expect } from "@playwright/test";
import { CommonElements } from "../../page-objects/CommonElements.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Language link @language_link", () => {
    let commonElements;

    test.beforeEach(async ({ page }) => {
        commonElements = new CommonElements(page);
    });

    test("change language to Welsh, begin registration ... @change_language_to_welsh_and_being_registration", async ({ page }) => {
        await openWebsite(page, "url", "/cleansession");
        await openWebsite(page, "url", "index");
        
        await expect(page.locator(commonElements.selectors.languageEnHeader)).toContainText("English");
        await expect(page.locator(commonElements.selectors.languageCyHeader)).toContainText("Cymraeg");
        await expect(page).toHaveTitle(/Register a Food Business/);
        
        await commonElements.switchToWelsh();
        // Wait for reload or text change
        await expect(page).toHaveTitle(/Cofrestru Busnesau Bwyd/);
        
        // Start registration
        await page.click("#main-content .govuk-button"); // "Begin registration" / "Dechreuwch gofrestru"

        // Current environment enters the journey at establishment address.
        await expect(page).toHaveURL(/.*establishment-address/);
        
        await commonElements.clickBackButton();
        
        await expect(page).toHaveTitle(/Cofrestru Busnesau Bwyd/);
        
        await commonElements.switchToEnglish();
        await expect(page).toHaveTitle(/Register a Food Business/);
    });
});
