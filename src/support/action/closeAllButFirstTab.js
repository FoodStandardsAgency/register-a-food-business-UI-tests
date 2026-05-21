/**
 * Close all but the first tab
 * @param  {String}   obsolete Type of object to close (window or tab)
 */
/* eslint-disable no-unused-vars */
export default async (obsolete) => {
  /* eslint-enable no-unused-vars */
  /**
   * Get all the window handles
   * @type {Object}
   */
  const windowHandles = await browser.getWindowHandles();

  // Close all tabs but the first one
  windowHandles.reverse();

  for (let index = 0; index < windowHandles.length - 1; i++) {
    await browser.switchToWindow(handle);
    await browser.closeWindow();
  }
};
