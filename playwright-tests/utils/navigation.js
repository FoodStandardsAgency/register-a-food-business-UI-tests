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
 * @param {{ autoAcceptCookies?: boolean }=} options - Optional behavior toggles
 */
export async function openWebsite(page, type, path, options = {}) {
  let url;
  let effectivePath = path;

  if (type === "url") {
    const isAbsoluteUrl =
      typeof path === "string" && /^https?:\/\//i.test(path);

    if (isAbsoluteUrl) {
      url = path;
    } else {
      // Many tests use bare route names (e.g. "index", "customer-type") which are
      // served under the `/new/` prefix in this environment.
      if (effectivePath === "index" || effectivePath === "/index") {
        effectivePath = "/new/index";
      } else if (effectivePath && !effectivePath.startsWith("/")) {
        effectivePath = `/new/${effectivePath}`;
      }

      url = effectivePath;
    }
  } else if (type === "adminportal") {
    // Get admin portal credentials from environment
    const username = process.env.DEV_USERNAME || "admin";
    const password = process.env.DEV_PASSWORD || "BursesDolesTomtit";
    const baseAdminUrl =
      process.env.BASE_ADMIN_URL ||
      "https://test-register-a-food-business-admin.azurewebsites.net";

    // Parse the base admin URL to insert credentials
    const urlObj = new URL(baseAdminUrl);

    // Add basic auth credentials to the URL
    url = `${urlObj.protocol}//${username}:${password}@${urlObj.host}${path}`;
  } else {
    // Default to 'site' mode - use base URL from config
    const baseUrl = process.env.BASE_URL || page.context()._options.baseURL;
    url = baseUrl + (path || "");
  }

  await page.goto(url);

  // Handle Cookie Banner if present (optional)
  if (options.autoAcceptCookies !== false) {
    try {
      const cookieBannerButton = page.getByRole("button", {
        name: /accept cookies/i,
      });
      if (await cookieBannerButton.isVisible({ timeout: 2000 })) {
        await cookieBannerButton.click();
      }
    } catch (e) {
      // Ignore if not found or timeout
    }
  }

  // Wait for the page to be loaded and URL to contain the path
  await page.waitForLoadState("networkidle");

  if (effectivePath) {
    // Verify URL contains the expected path
    const currentUrl = page.url();
    const expectedPath = effectivePath.split("?")[0];
    if (expectedPath !== "/" && !currentUrl.includes(expectedPath)) {
      throw new Error(
        `Expected URL to contain "${expectedPath}", but got "${currentUrl}"`
      );
    }
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
  queryParams.append("QA_KEY", qaKey);

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach((item) => queryParams.append(key, item));
    } else {
      queryParams.append(key, value);
    }
  }

  // Navigate to QA injection route
  const baseUrl = process.env.BASE_URL || page.context()._options.baseURL;
  const qaUrl = `${baseUrl}/qa/registration-summary?${queryParams.toString()}`;

  const gotoWithRetry = async (urlToVisit) => {
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await page.goto(urlToVisit);
      await page.waitForLoadState("networkidle");

      try {
        const unavailableHeading = page
          .locator("h1", { hasText: /this service is currently unavailable/i })
          .first();

        if (await unavailableHeading.isVisible({ timeout: 1000 })) {
          if (attempt === maxAttempts) {
            throw new Error(
              `Service unavailable after ${maxAttempts} attempts: ${urlToVisit}`
            );
          }

          await page.waitForTimeout(500);
          continue;
        }
      } catch (e) {
        // If the heading isn't found quickly, proceed.
        if (e?.message?.includes("Service unavailable after")) {
          throw e;
        }
      }

      return;
    }
  };

  await gotoWithRetry(qaUrl);

  // Cookie banner may appear on first load of an injected session.
  // If it stays visible, generic ".govuk-button" selectors can become ambiguous.
  try {
    const cookieBannerButton = page.getByRole("button", {
      name: /accept cookies/i,
    });
    if (await cookieBannerButton.isVisible({ timeout: 2000 })) {
      await cookieBannerButton.click();
      await page.waitForLoadState("networkidle");
    }
  } catch (e) {
    // Ignore if not found or timeout
  }

  // If a specific target path is requested (other than the summary where we land), navigate there
  if (targetPath && targetPath !== "/registration-summary") {
    const nextUrl = `${baseUrl}/new${targetPath}`;
    await gotoWithRetry(nextUrl);
  }
}

/**
 * Get available test datasets for QA route injection
 * These datasets mirror the WebdriverIO test data
 */
function getDatasets() {
  return {
    "import-export-setup": {
      la_id: "6008",
      operator_type: "SOLETRADER",
      operator_first_name: "Fred",
      operator_last_name: "Bloggs",
      operator_birthdate_day: "01",
      operator_birthdate_month: "01",
      operator_birthdate_year: "2001",
      operator_postcode: "AA11 1AA",
      operator_postcode_find: "AA11 1AA",
      operator_address_line_1: "11",
      operator_address_line_2: "Some Street",
      operator_address_line_3: "Some Locality",
      operator_town: "London",
      operator_primary_number: "01234567890",
      operator_email: "testemail@email.com",
      registration_role: "SOLETRADER",
      establishment_trading_name: "Trading name",
      establishment_email: "establishment@email.com",
      establishment_primary_number: "01234567890",
      establishment_web_address: "test.com",
      establishment_secondary_number: "02293928372",
      establishment_address_line_1: "First line",
      establishment_address_line_2: "Street",
      establishment_address_line_3: "Locality",
      establishment_town: "Town",
      establishment_postcode: "AA11 1AA",
      establishment_postcode_find: "AA11 1AA",
      establishment_type: "DOMESTIC",
      establishment_opening_status: "Establishment is already trading",
      opening_days_start: "Some days",
      opening_days_some: "Monday",
      opening_day_monday: "true",
      opening_hours_monday: "09:30 - 19:00",
      supply_directly: "true",
      supply_other: "true",
      business_type: "Livestock farm",
      customer_type: "END_CONSUMER",
      day: "01",
      month: "01",
      year: "2001",
      directly_import: "Directly import",
      water_supply: "PUBLIC",
      business_scale: ["EXPORT"],
      food_type: "DONT_KNOW",
      processing_activities: ["SOUS_VIDE", "VACUUM_PACKING"]
    },
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
    "registration-summary-partnership-2": {
      la_id: 6008,
      operator_type: "PARTNERSHIP",
      operator_address_line_1: "First line",
      operator_address_line_2: "Street",
      operator_address_line_3: "Somewhere",
      operator_town: "Town",
      operator_postcode: "AA11 1AA",
      operator_postcode_find: "AA11 1AA",
      operator_first_name: "Fred",
      operator_last_name: "Bloggs",
      operator_birthdate: "1989-02-01",
      operator_birthdate_day: "01",
      operator_birthdate_month: "02",
      operator_birthdate_year: "1989",
      main_partner_primary_number: "01234567890",
      establishment_secondary_number: "02293928372",
      main_partner_email: "email@email.com",
      main_partner_secondary_number: "02134567890",
      registration_role: "PARTNERSHIP",
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
      establishment_email: "emfffsfsdfail@email.com",
      establishment_web_address: "test.com",
      business_type: "Livestock farm",
      customer_type: "END_CONSUMER",
      supply_directly: "true",
      supply_other: "true",
      establishment_opening_status: "Establishment is already trading",
      day: "01",
      month: "01",
      year: "2001",
      opening_days_start: "Some days",
      opening_days_some: "Monday",
      opening_day_monday: "Monday",
      opening_hours_monday: "09:30 - 19:00",
      business_scale: ["LOCAL", "NATIONAL"],
      food_type: ["RAW_MEAT_FISH_SHELLFISH", "READY_TO_EAT"],
      processing_activities: ["VACUUM_PACKING", "PASTEURISING"],
      water_supply: "PUBLIC",
      directly_import: "Directly import",
      partners: ["One", "Two", "Three"],
      main_partnership_contact: "One",
    },
    "registration-summary-representative": {
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
      registration_role: "REPRESENTATIVE",
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
    "registration-summary-trading-every-day": {
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
      opening_days_start: "Every day",
      opening_days_some: "false",
      business_scale: ["FBO"],
      food_type: ["DONT_KNOW"],
      processing_activities: ["DONT_KNOW"],
      import_export_activities: ["NONE"],
      water_supply: ["PUBLIC"],
      customer_type: "END_CONSUMER",
    },
    "registration-summary-welsh": {
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
      business_type: "Fferm da byw",
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
      language: "cy",
    },
    declaration: {
      la_id: 6008,
      operator_type: "SOLETRADER",
      operator_first_name: "Fred",
      operator_last_name: "Bloggs",
      operator_birthdate: "1989-02-01",
      operator_birthdate_day: "01",
      operator_birthdate_month: "02",
      operator_birthdate_year: "1989",
      operator_postcode: "AA11 1AA",
      operator_postcode_find: "AA11 1AA",
      operator_address_line_1: "11",
      operator_address_line_2: "Some Street",
      operator_address_line_3: "Some Locality",
      operator_town: "London",
      operator_primary_number: "01234567890",
      operator_email: "testemail@email.com",
      registration_role: "SOLETRADER",
      establishment_trading_name: "Trading name",
      establishment_additional_trading_names: [
        "Trading name 1",
        "Trading name 2",
      ],
      establishment_email: "establishment@email.com",
      establishment_primary_number: "01234567890",
      establishment_secondary_number: "01234567890",
      establishment_address_line_1: "First line",
      establishment_address_line_2: "Street",
      establishment_address_line_3: "Locality",
      establishment_town: "Town",
      establishment_postcode: "AA11 1AA",
      establishment_postcode_find: "AA11 1AA",
      establishment_type: "DOMESTIC",
      establishment_opening_status: "Establishment is already trading",
      opening_days_start: "Some days",
      opening_days_some: "Monday",
      opening_day_monday: "true",
      opening_hours_monday: "09:30 - 19:00",
      supply_directly: "true",
      supply_other: "true",
      business_type: "Livestock farm",
      customer_type: "END_CONSUMER",
      day: "01",
      month: "01",
      year: "2001",
      directly_import: "Directly import",
      business_scale: ["DONT_KNOW"],
      food_type: ["DONT_KNOW"],
      processing_activities: ["DONT_KNOW"],
      water_supply: "PUBLIC",
    },
    declaration_seperate_standardsCouncil: {
      la_id: 4221,
      operator_type: "SOLETRADER",
      operator_first_name: "Fred",
      operator_last_name: "Bloggs",
      operator_birthdate: "1989-02-01",
      operator_birthdate_day: "01",
      operator_birthdate_month: "02",
      operator_birthdate_year: "1989",
      operator_postcode: "AA11 1AA",
      operator_postcode_find: "AA11 1AA",
      operator_address_line_1: "11",
      operator_address_line_2: "Some Street",
      operator_address_line_3: "Some Locality",
      operator_town: "London",
      operator_primary_number: "01234567890",
      operator_email: "testemail@email.com",
      registration_role: "SOLETRADER",
      establishment_trading_name: "Trading name",
      establishment_additional_trading_names: [
        "Trading name 1",
        "Trading name 2",
      ],
      establishment_email: "establishment@email.com",
      establishment_primary_number: "01234567890",
      establishment_secondary_number: "01234567890",
      establishment_address_line_1: "First line",
      establishment_address_line_2: "Street",
      establishment_address_line_3: "Locality",
      establishment_town: "Town",
      establishment_postcode: "AA11 1AA",
      establishment_postcode_find: "AA11 1AA",
      establishment_type: "DOMESTIC",
      establishment_opening_status: "Establishment is already trading",
      opening_days_start: "Some days",
      opening_days_some: "Monday",
      opening_day_monday: "true",
      opening_hours_monday: "09:30 - 19:00",
      supply_directly: "true",
      supply_other: "true",
      business_type: "Livestock farm",
      customer_type: "END_CONSUMER",
      day: "01",
      month: "01",
      year: "2001",
      directly_import: "Directly import",
      business_scale: ["DONT_KNOW"],
      food_type: ["DONT_KNOW"],
      processing_activities: ["DONT_KNOW"],
      water_supply: "PUBLIC",
    },
    "blank-partnership": {
      la_id: 6008,
      registration_role: "PARTNERSHIP",
    },
  };
}
