import { test, expect } from "@playwright/test";
import { SubmitRegistration } from "../../page-objects/SubmitRegistration.page";
import { SummaryConfirmation } from "../../page-objects/SummaryConfirmation.page";
import { openWebsite, injectDataIntoRegSummary } from "../../utils/navigation";

test.describe.parallel("Local Council Lookup @LC_Lookup_SDB-6", () => {
    let submitRegistration;
    let summaryConfirmation;

    test.beforeEach(async ({ page }) => {
        submitRegistration = new SubmitRegistration(page);
        summaryConfirmation = new SummaryConfirmation(page);
    });

    test("happy path @LC_Lookup_SDB-6", async ({ page }) => {
        await openWebsite(page, "url", "/cleansession");
        // Dataset "declaration" needs to check if exists in navigation.js
        // If not, I'll need to add it or use "registration-summary" and navigate to declaration?
        // Feature says: AND I go to ... with injected "declaration" data
        await injectDataIntoRegSummary(page, "declaration", "/declaration");
        
        await submitRegistration.checkFirstDeclaration();
        await submitRegistration.checkSecondDeclaration();
        await submitRegistration.checkThirdDeclaration();
        
        await submitRegistration.clickContinue();
        
        await expect(page).toHaveURL(/.*summary-confirmation/);
        
        await expect(page.locator(summaryConfirmation.selectors.hygieneAndStandardsCouncil)).toBeVisible();
    });

    test("happy path with a district and county council @LC_Lookup_SDB-6_district_and_county", async ({ page }) => {
        await openWebsite(page, "url", "/cleansession");
        // Dataset "declaration_seperate_standardsCouncil"
        await injectDataIntoRegSummary(page, "declaration_seperate_standardsCouncil", "/declaration");
        
        await submitRegistration.checkFirstDeclaration();
        await submitRegistration.checkSecondDeclaration();
        await submitRegistration.checkThirdDeclaration();
        
        await submitRegistration.clickContinue();
        
        await expect(page).toHaveURL(/.*summary-confirmation/);
        
        await expect(page.locator(summaryConfirmation.selectors.hygieneCouncil)).toBeVisible();
        await expect(page.locator(summaryConfirmation.selectors.standardsCouncil)).toBeVisible();
    });
});
