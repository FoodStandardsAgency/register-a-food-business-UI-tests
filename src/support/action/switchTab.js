/**
 * Switch to the first tab
 */
export default async () => {
  const tabs = await browser.getWindowHandles();
  await browser.switchToWindow(tabs[0]);
};
