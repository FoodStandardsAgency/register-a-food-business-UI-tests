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
  const url = type === "url" ? page : browser.options.baseUrl + page;
  await browser.url(url);
  await browser.waitUntil(async () => {
    return (await browser.getUrl()).includes(page);
  });
};
