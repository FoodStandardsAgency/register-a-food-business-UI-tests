/**
 * Delete all cookies
 * @param  {String}   name The name of the cookies to delete
 */
module.exports = () => {
    browser.deleteAllCookies();
};
