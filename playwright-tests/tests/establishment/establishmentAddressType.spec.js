import { test, expect } from "@playwright/test";
import { EstablishmentAddressType } from "../../page-objects/EstablishmentAddressType.page";
import { openWebsite } from "../../utils/navigation";

test.describe.parallel("Establishment address type section validation", () => {
  let establishmentAddressType;

  test.beforeEach(async ({ page }) => {
    establishmentAddressType = new EstablishmentAddressType(page);
  });

  test("happy path for establishment address Type @happy_path_SDB-50", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-address-type");

    // Click Continue without selection first? Feature says:
    // And I click on the element "estabAddressType.button" (Maybe just clicking?)
    // When I click on the element "estabAddressType.businessCommercial"
    // And I click on the element "estabAddressType.button"
    // Then ...

    // Wait, "And I click on the element 'estabAddressType.button'" BEFORE selecting?
    // This might be testing error states implicitly or just a stray click?
    // Or maybe it ensures no error?
    // The scenario is happy path.
    // I will ignore the first click if it's redundant, or keeping it if it triggers validation.
    // Let's keep it.
    await establishmentAddressType.clickContinue();

    // It should validation error if empty?
    // But then we select...

    await establishmentAddressType.selectBusinessCommercial();
    await establishmentAddressType.clickContinue();

    await expect(page).not.toHaveURL(/.*establishment-address-details/);
  });

  test("error shows when no establishment type is selected @not_selected_establishment_type_SDB-50", async ({
    page,
  }) => {
    await openWebsite(page, "url", "/cleansession");
    await openWebsite(page, "url", "/new/establishment-address-type");

    await establishmentAddressType.clickContinue();

    await expect(
      page.locator(establishmentAddressType.selectors.error)
    ).toContainText(
      "You must select an establishment address type before continuing"
    );
  });
});
