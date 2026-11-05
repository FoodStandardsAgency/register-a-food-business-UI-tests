/**
 * Open the given URL
 * @param  {String}   type Type of navigation (getUrl or site)
 * @param  {String}   page The URL to navigate to
 */
export default async (type, page) => {
  /**
   * The URL to navigate to
   * @type {String}
   */
  let url;
  if (type === "url") {
    url = page;
  } else if (type === "adminportal") {
    // Get admin portal credentials from environment or use defaults
    const username = process.env.DEV_USERNAME || "admin";
    const password = process.env.DEV_PASSWORD || "BursesDolesTomtit";

    // Parse the base admin URL to insert credentials
    const baseAdminUrl =
      global.testConfig?.baseAdminUrl || process.env.BASE_ADMIN;
    if (!baseAdminUrl) {
      throw new Error("baseAdminUrl is not defined");
    }
    const urlObj = new URL(baseAdminUrl);

    // Add basic auth credentials to the URL
    url = `${urlObj.protocol}//${username}:${password}@${urlObj.host}${page}`;
  } else {
    url = browser.options.baseUrl + page;
  }
  await browser.url(url);
  await browser.waitUntil(async () => {
    return (await browser.getUrl()).includes(page);
  });
};
