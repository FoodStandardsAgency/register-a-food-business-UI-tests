import { BasePage } from "../utils/BasePage.js";

export class RegistrationSummary extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      button: "#main-content .govuk-button",
      error: ".govuk-error-message",
      operatorType: "#operator_type",
      companyName: "#operator_company_name",
      companiesNumber: "#operator_companies_house_number",
      operatorFirstName: "#operator_first_name",
      operatorLastName: "#operator_last_name",
      operatorEmail: "#operator_email",
      operatorPrimaryNumber: "#operator_primary_number",
      partnershipMainContact: "#main_partnership_contact",
      partnerOne: "#partners",
      partnerTwo: "#operatorPartnersRow>td>div:nth-child(2)",
      partnerThree: "#operatorPartnersRow>td>div:nth-child(3)",
      representativeName: "#designated_contact",
      representativeRole: "#designated_contact",
      representativeNumber: "#designated_contact",
      representativeEmail: "#designated_contact",
      tradingName: "#establishment_trading_name",
      additionalTradingNames:
        "#main-content > div > div > form > dl:nth-child(12) > div > dd.govuk-summary-list__value > ul > li",
      establishmentType: "#establishment_type",
      establishmentPrimaryNumber: "#establishment_primary_number",
      establishmentSecondaryNumber: "#establishment_secondary_number",
      establishmentEmail: "#establishment_email",
      establishmentAddressStreet: "#establishment_address_line_2",
      foodActivities: "#import_export_activities",
      openingDaysMonday: "#opening_day_monday",
      openingDaysTuesday: "#opening_day_tuesday",
      tradingStartDate: "#establishment_opening_date",
      customertype: "#customer_type",
      businessType: "#business_type",
      waterSupply: "#water_supply",
      importExportActivities: "#import_export_activities",
      changeCompanyName: "#changeOperatorCompanyNameRow",
      // Prefer `getChangeLink()` + semantic key text over nth-child selectors.
      changeOperatorType:
        "#main-content > div > div > form > dl:nth-child(4) > div > dd.govuk-summary-list__actions > a",
      changeCharityName: "#changeOperatorCharityNameRow",
      changeCharityNumber: "#changeOperatorCharityNumberRow",
      changeOperatorName: "#changeOperatorNameRow",
      changeOperatorContactDetails: "#changeOperatorContactDetailsRow",
      changeOperatorEmail:
        "#main-content > div > div > form > dl:nth-child(9) > div > dd.govuk-summary-list__actions > a",
      changeTradingName:
        "#main-content > div > div > form > dl:nth-child(11) > div > dd.govuk-summary-list__actions > a",
      changeAdditionalTradingNames:
        "#main-content > div > div > form > dl:nth-child(12) > div > dd.govuk-summary-list__actions > a",
      changeEstablishmentAddress: "#changeEstablishmentAddressRow",
      changeEstablishmentContactDetails:
        "#changeEstablishmentContactDetailsRow",
      changeEstablishmentEmail: "#changeEstablishmentEmailRow",
      changeEstablishmentLocationType: "#changeEstablishmentLocationType",
      changeTradingStartDate: "#changeEstablishmentOpeningDateRow",
      changeOpeningDays: "#changeOpeningDaysRow",
      changeRepresentative: "#changeRepresentativeRow",
    };
  }

  async getChangeLink(keyText) {
    return this.page
      .locator(
        `.govuk-summary-list__row:has(dt.govuk-summary-list__key:has-text("${keyText}")) .govuk-summary-list__actions a`
      )
      .first();
  }

  async clickChangeLinkForKey(keyTexts) {
    const keys = Array.isArray(keyTexts) ? keyTexts : [keyTexts];

    for (const keyText of keys) {
      const link = await this.getChangeLink(keyText);
      if ((await link.count()) > 0) {
        await link.click();
        return;
      }
    }

    throw new Error(
      `Could not find change link for summary key: ${keys.join(" | ")}`
    );
  }

  async changeTradingStartDate() {
    // This environment labels the row as "Trading date".
    await this.clickChangeLinkForKey(["Trading start date", "Trading date"]);
  }

  async changeOpeningDays() {
    await (await this.getChangeLink("Opening days")).click();
  }

  async changeRepresentative() {
    await this.page.locator(this.selectors.changeRepresentative).click();
  }

  async changeOperatorType() {
    await this.clickChangeLinkForKey(["Operator type", "Operator"]);
  }

  async clickChangeCompanyName() {
    await this.page.locator(this.selectors.changeCompanyName).click();
  }

  async clickChangeOperatorName() {
    await this.page.locator(this.selectors.changeOperatorName).click();
  }

  async clickChangeEstablishmentAddress() {
    await this.page.locator(this.selectors.changeEstablishmentAddress).click();
  }

  async clickContinue() {
    await this.page.locator(this.selectors.button).first().click();
  }

  async getOperatorType() {
    return await this.page.locator(this.selectors.operatorType).textContent();
  }

  async getTradingName() {
    return await this.page.locator(this.selectors.tradingName).textContent();
  }

  async hasError() {
    return await this.page.locator(this.selectors.error).isVisible();
  }
}
