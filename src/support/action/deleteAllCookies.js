/**
 * Delete all cookies
 * @param  {String}   name The name of the cookies to delete
 */
export default async () => {
  await browser.deleteAllCookies();
};
