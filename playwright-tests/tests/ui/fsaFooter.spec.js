import { test, expect } from "@playwright/test";
import { CommonElements } from "../../page-objects/CommonElements.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("FSA Footer validation @fsa_footer_SDB-647", () => {
    let commonElements;

    test.beforeEach(async ({ page }) => {
        commonElements = new CommonElements(page);
    });

    test("footer is visible @fsa_footer_SDB-647_happy_path", async ({ page }) => {
        await openWebsite(page, "url", "/cleansession");
        
        const pages = ["index", "registration-role", "operator-name"];
        
        for (const url of pages) {
            await openWebsite(page, "url", url);
            await expect(page.locator(commonElements.selectors.fsaFooter)).toBeVisible();
        }
    });

    test("cookie policy in footer @fsa_footer_SDB-647_cookie_policy", async ({ page }) => {
        await openWebsite(page, "url", "/cleansession");
        await openWebsite(page, "url", "index");
        
        await expect(page.locator(commonElements.selectors.fsaFooter)).toBeVisible();
        
        const link = page.locator(commonElements.selectors.cookiePolicyFooter);
        await expect(link).toHaveAttribute("href", "https://www.food.gov.uk/cookie-policy");
        
        const [newPage] = await Promise.all([
            page.context().waitForEvent("page"),
            commonElements.clickCookiePolicyFooter(),
        ]);
        expect(newPage).toBeDefined();
    });

    test("privacy policy in footer @fsa_footer_SDB-647_privacy_policy", async ({ page }) => {
        await openWebsite(page, "url", "/cleansession");
        await openWebsite(page, "url", "index");

        await expect(page.locator(commonElements.selectors.fsaFooter)).toBeVisible();
        
        const link = page.locator(commonElements.selectors.privacyPolicyFooter);
        await expect(link).toHaveAttribute("href", "https://www.food.gov.uk/about-us/register-a-food-business-privacy-notice");
        
        const [newPage] = await Promise.all([
            page.context().waitForEvent("page"),
            commonElements.clickPrivacyPolicyFooter(),
        ]);
        expect(newPage).toBeDefined();
    });

    test("change language link in footer @fsa_footer_language_link", async ({ page }) => {
        await openWebsite(page, "url", "/cleansession");
        await openWebsite(page, "url", "index");
        
        await expect(page.locator(commonElements.selectors.languageFooter)).toBeVisible();
        await expect(page.locator(commonElements.selectors.languageFooter)).toContainText("Cymraeg");
        
        await commonElements.clickLanguageFooter();
        // Page reload
        await expect(page.locator(commonElements.selectors.languageFooter)).toContainText("English");
        
        await commonElements.clickLanguageFooter();
        await expect(page.locator(commonElements.selectors.languageCyHeader)).toContainText("Cymraeg");
    });
});
