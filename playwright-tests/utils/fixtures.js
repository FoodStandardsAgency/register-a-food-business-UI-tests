import { test as base } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

/**
 * Extended test fixture with custom utilities
 */
export const test = base.extend({
  /**
   * Base URL fixture
   */
  baseURL: async ({}, use) => {
    await use(
      process.env.BASE_URL ||
        "https://test-register-a-food-business.azurewebsites.net"
    );
  },

  /**
   * Admin portal URL fixture with basic auth
   */
  adminPortalURL: async ({}, use) => {
    const username = process.env.DEV_USERNAME || "admin";
    const password = process.env.DEV_PASSWORD || "BursesDolesTomtit";
    const baseAdminUrl =
      process.env.BASE_ADMIN_URL ||
      "https://test-register-a-food-business-admin.azurewebsites.net";

    const urlObj = new URL(baseAdminUrl);
    const authenticatedUrl = `${urlObj.protocol}//${username}:${password}@${urlObj.host}`;

    await use(authenticatedUrl);
  },

  /**
   * QA key fixture for data injection
   */
  qaKey: async ({}, use) => {
    await use(process.env.QA_KEY || "");
  },
});

export { expect } from "@playwright/test";
