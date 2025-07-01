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
    url = global.testConfig.baseAdminUrl + page;
  } else {
    url = browser.options.baseUrl + page;
  }
  await browser.url(url);
  await browser.waitUntil(async () => {
    return (await browser.getUrl()).includes(page);
  });
};
