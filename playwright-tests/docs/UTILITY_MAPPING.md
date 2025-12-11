# WebdriverIO to Playwright Utility Mapping

This document maps WebdriverIO custom utilities to Playwright equivalents and identifies which custom utilities are still needed.

## Action Helpers (24 total)

### ✅ Standard Playwright Functions (No Custom Port Needed)

| WebdriverIO Helper      | Playwright Equivalent                                  | Notes              |
| ----------------------- | ------------------------------------------------------ | ------------------ |
| `clickElement`          | `page.locator(selector).click()`                       | Direct replacement |
| `setInputField`         | `page.locator(selector).fill(value)`                   | Direct replacement |
| `clearInputField`       | `page.locator(selector).clear()` or `fill('')`         | Direct replacement |
| `selectOption`          | `page.locator(selector).selectOption(value)`           | Direct replacement |
| `selectOptionByIndex`   | `page.locator(selector).selectOption({ index: n })`    | Direct replacement |
| `waitFor`               | `page.locator(selector).waitFor()`                     | Direct replacement |
| `waitForDisplayed`      | `page.locator(selector).waitFor({ state: 'visible' })` | Direct replacement |
| `pressButton`           | `page.keyboard.press(key)`                             | Direct replacement |
| `pause`                 | `page.waitForTimeout(ms)`                              | Direct replacement |
| `scroll`                | `page.locator(selector).scrollIntoViewIfNeeded()`      | Direct replacement |
| `moveTo`                | `page.locator(selector).hover()`                       | Direct replacement |
| `dragElement`           | `page.locator(selector).dragTo(target)`                | Direct replacement |
| `setCookie`             | `page.context().addCookies([...])`                     | Direct replacement |
| `deleteCookies`         | `page.context().clearCookies()`                        | Direct replacement |
| `deleteAllCookies`      | `page.context().clearCookies()`                        | Direct replacement |
| `setWindowSize`         | `page.setViewportSize({ width, height })`              | Direct replacement |
| `switchTab`             | `page.context().pages()[index]`                        | Direct replacement |
| `closeLastOpenedWindow` | `pages[pages.length-1].close()`                        | Direct replacement |
| `closeAllButFirstTab`   | Loop and close                                         | Direct replacement |
| `focusLastOpenedWindow` | `pages[pages.length-1].bringToFront()`                 | Direct replacement |
| `submitForm`            | `page.locator('form').evaluate(form => form.submit())` | Direct replacement |
| `setPromptText`         | `page.on('dialog', dialog => dialog.accept(text))`     | Direct replacement |
| `handleModal`           | `page.on('dialog', ...)`                               | Direct replacement |

### 🔧 Custom Utilities Needed

| WebdriverIO Helper         | Why Custom Needed                                  | Priority |
| -------------------------- | -------------------------------------------------- | -------- |
| `openWebsite`              | Handles URL/site/adminportal modes with basic auth | **HIGH** |
| `injectDataIntoRegSummary` | QA route data injection pattern                    | **HIGH** |

## Check Helpers (28 total)

### ✅ Standard Playwright Assertions (No Custom Port Needed)

| WebdriverIO Helper         | Playwright Equivalent                                | Notes              |
| -------------------------- | ---------------------------------------------------- | ------------------ |
| `checkContainsText`        | `expect(locator).toContainText(text)`                | Direct replacement |
| `checkEqualsText`          | `expect(locator).toHaveText(text)`                   | Direct replacement |
| `checkElementExists`       | `expect(locator).toBeVisible()`                      | Direct replacement |
| `isDisplayed`              | `expect(locator).toBeVisible()`                      | Direct replacement |
| `isEnabled`                | `expect(locator).toBeEnabled()`                      | Direct replacement |
| `isExisting`               | `expect(locator).toHaveCount(n)` or `toBeVisible()`  | Direct replacement |
| `checkURL`                 | `expect(page).toHaveURL(url)`                        | Direct replacement |
| `checkInURLPath`           | `expect(page.url()).toContain(path)`                 | Direct replacement |
| `checkURLPath`             | `expect(page).toHaveURL(new RegExp(pattern))`        | Direct replacement |
| `checkTitle`               | `expect(page).toHaveTitle(title)`                    | Direct replacement |
| `checkTitleContains`       | `expect(page).toHaveTitle(new RegExp(pattern))`      | Direct replacement |
| `checkSelected`            | `expect(locator).toBeChecked()`                      | Direct replacement |
| `checkIsEmpty`             | `expect(locator).toBeEmpty()`                        | Direct replacement |
| `checkContainsAnyText`     | `expect(locator).not.toBeEmpty()`                    | Direct replacement |
| `checkCookieExists`        | `page.context().cookies()` + assertion               | Direct replacement |
| `checkCookieContent`       | `page.context().cookies()` + assertion               | Direct replacement |
| `checkClass`               | `expect(locator).toHaveClass(className)`             | Direct replacement |
| `checkProperty`            | `expect(locator).toHaveAttribute(attr, value)`       | Direct replacement |
| `checkFocus`               | `expect(locator).toBeFocused()`                      | Direct replacement |
| `checkModal`               | `page.on('dialog', ...)`                             | Direct replacement |
| `checkModalText`           | `dialog.message()`                                   | Direct replacement |
| `checkNewWindow`           | `page.context().pages().length`                      | Direct replacement |
| `checkIsOpenedInNewWindow` | `page.context().pages().length`                      | Direct replacement |
| `checkWithinViewport`      | `locator.isIntersectingViewport()`                   | Direct replacement |
| `checkDimension`           | `locator.boundingBox()` + assertion                  | Direct replacement |
| `checkOffset`              | `locator.boundingBox()` + assertion                  | Direct replacement |
| `checkFontProperty`        | `locator.evaluate(el => getComputedStyle(el).font*)` | Direct replacement |
| `compareText`              | JavaScript string comparison                         | Direct replacement |

### 🔧 Custom Utilities Needed

**NONE** - All check helpers have Playwright equivalents.

## Summary

- **Action Helpers**: 2 custom utilities needed (openWebsite, injectDataIntoRegSummary)
- **Check Helpers**: 0 custom utilities needed
- **Total Custom Utilities**: 2 (down from 52)

## Implementation Priority

1. **HIGH**: `openWebsite` - Core navigation utility
2. **HIGH**: `injectDataIntoRegSummary` - QA route data injection
3. Create helper wrapper functions if team prefers abstraction layer
