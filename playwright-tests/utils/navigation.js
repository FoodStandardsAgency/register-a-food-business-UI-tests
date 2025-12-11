import dotenv from "dotenv";
dotenv.config();

/**
 * Navigation utilities for Playwright tests
 */

/**
 * Open website with different navigation modes
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} type - Type of navigation ('url', 'site', 'adminportal')
 * @param {string} path - URL or path to navigate to
 */
export async function openWebsite(page, type, path) {
  let url;

  if (type === "url") {
    url = path;
  } else if (type === "adminportal") {
    // Get admin portal credentials from environment
    const username = process.env.DEV_USERNAME || "admin";
    const password = process.env.DEV_PASSWORD || "BursesDolesTomtit";
    const baseAdminUrl = process.env.BASE_ADMIN_URL;

    if (!baseAdminUrl) {
      throw new Error("BASE_ADMIN_URL is not defined in environment variables");
    }

    // Parse the base admin URL to insert credentials
    const urlObj = new URL(baseAdminUrl);

    // Add basic auth credentials to the URL
    url = `${urlObj.protocol}//${username}:${password}@${urlObj.host}${path}`;
  } else {
    // Default to 'site' mode - use base URL from config
    const baseUrl = process.env.BASE_URL || page.context()._options.baseURL;
    url = baseUrl + path;
  }

  await page.goto(url);

  // Wait for the page to be loaded and URL to contain the path
  await page.waitForLoadState("networkidle");

  // Verify URL contains the expected path
  const currentUrl = page.url();
  if (!currentUrl.includes(path.split("?")[0])) {
    throw new Error(
      `Expected URL to contain "${path}", but got "${currentUrl}"`
    );
  }
}

/**
 * Inject test data into registration summary via QA route
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} dataset - Dataset name (e.g., 'registration-summary')
 * @param {string} targetPath - Target path to navigate to after injection
 */
export async function injectDataIntoRegSummary(
  page,
  dataset,
  targetPath = "/registration-summary"
) {
  const qaKey = process.env.QA_KEY;

  if (!qaKey) {
    throw new Error("QA_KEY is not defined in environment variables");
  }

  // Get dataset from datasets object
  const datasets = getDatasets();
  const data = datasets[dataset];

  if (!data) {
    throw new Error(`Dataset "${dataset}" not found`);
  }

  // Build query string from dataset
  const queryParams = new URLSearchParams();
  queryParams.append("qakey", qaKey);

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach((item) => queryParams.append(key, item));
    } else {
      queryParams.append(key, value);
    }
  }

  // Navigate to target path with query string
  const baseUrl = process.env.BASE_URL || page.context()._options.baseURL;
  const fullUrl = `${baseUrl}/new${targetPath}?${queryParams.toString()}`;

  await page.goto(fullUrl);
  await page.waitForLoadState("networkidle");
}

/**
 * Get available test datasets for QA route injection
 * These datasets mirror the WebdriverIO test data
 */
function getDatasets() {
  return {
    "registration-summary": {
      la_id: 6008,
      operator_address_line_1: "First line",
      operator_address_line_2: "Street",
      operator_address_line_3: "Somewhere",
      operator_town: "Town",
      operator_postcode: "AA11 1AA",
      operator_postcode_find: "AA11 1AA",
      operator_first_name: "Fred",
      operator_last_name: "Bloggs",
      operator_birthdate: "1989 02 01",
      operator_birthdate_day: "01",
      operator_birthdate_month: "02",
      operator_birthdate_year: "1989",
      operator_primary_number: "01234567890",
      operator_secondary_number: "02293928372",
      operator_email: "email@email.com",
      registration_role: "SOLETRADER",
      establishment_trading_name: "Trading name",
      establishment_additional_trading_names: [
        "Trading name 1",
        "Trading name 2",
      ],
      establishment_address_line_1: "First line",
      establishment_address_line_2: "Street",
      establishment_address_line_3: "Somewhere",
      establishment_town: "Town",
      establishment_postcode: "AA11 1AA",
      establishment_postcode_find: "AA11 1AA",
      establishment_type: "DOMESTIC",
      establishment_primary_number: "01434567890",
      establishment_secondary_number: "01234567890",
      establishment_email: "emfffsfsdfail@email.com",
      establishment_web_address: "test.com",
      business_type: "Livestock farm",
      supply_directly: "true",
      supply_other: "true",
      establishment_opening_status: "Establishment is already trading",
      day: "01",
      month: "01",
      year: "2001",
      opening_days_start: "Some days",
      opening_days_some: "Monday",
      opening_day_monday: "true",
      opening_hours_monday: "09:30 - 19:00",
      business_scale: ["FBO"],
      food_type: ["DONT_KNOW"],
      processing_activities: ["DONT_KNOW"],
      import_export_activities: ["NONE"],
      water_supply: ["PUBLIC"],
      customer_type: "END_CONSUMER",
      partnership_name: "Test Partnership",
    },
    "registration-summary-charity": {
      la_id: 6008,
      operator_charity_name: "Test Charity",
      operator_charity_number: "12345678",
      operator_address_line_1: "Charity Street",
      operator_town: "Charity Town",
      operator_postcode: "CH11 1TY",
      operator_primary_number: "01234567890",
      operator_email: "charity@email.com",
      registration_role: "CHARITY",
      establishment_trading_name: "Charity Trading",
      establishment_address_line_1: "Charity Est Street",
      establishment_town: "Charity Est Town",
      establishment_postcode: "CH22 2TY",
      establishment_type: "DOMESTIC",
      establishment_primary_number: "01434567890",
      establishment_email: "estcharity@email.com",
      business_type: "Other catering premises",
      establishment_opening_status: "Establishment is already trading",
      day: "01",
      month: "01",
      year: "2001",
      business_scale: ["FBO"],
      food_type: ["DONT_KNOW"],
      processing_activities: ["DONT_KNOW"],
      import_export_activities: ["NONE"],
      water_supply: ["PUBLIC"],
      customer_type: "END_CONSUMER",
    },
    "registration-summary-partnership": {
      la_id: 6008,
      partnership_name: "Test Partnership Ltd",
      operator_address_line_1: "Partnership Street",
      operator_town: "Partnership Town",
      operator_postcode: "PA11 1TY",
      operator_primary_number: "01234567890",
      operator_email: "partnership@email.com",
      registration_role: "PARTNERSHIP",
      main_partnership_contact_first_name: "John",
      main_partnership_contact_last_name: "Partner",
      partners_first_name: "Jane",
      partners_last_name: "Partner2",
      establishment_trading_name: "Partnership Trading",
      establishment_address_line_1: "Partnership Est Street",
      establishment_town: "Partnership Est Town",
      establishment_postcode: "PA22 2TY",
      establishment_type: "DOMESTIC",
      establishment_primary_number: "01434567890",
      establishment_email: "estpartnership@email.com",
      business_type: "Restaurant",
      establishment_opening_status: "Establishment is already trading",
      day: "01",
      month: "01",
      year: "2001",
      business_scale: ["FBO"],
      food_type: ["DONT_KNOW"],
      processing_activities: ["DONT_KNOW"],
      import_export_activities: ["NONE"],
      water_supply: ["PUBLIC"],
      customer_type: "END_CONSUMER",
    },
  };
}
