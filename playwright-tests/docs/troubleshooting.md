# Playwright Troubleshooting Guide

## Common Issues

### 1. "Element not found" or Timeout Errors
**Symptoms**: Test fails after 10-30s waiting for an element.
**Causes**:
- Selector is incorrect or outdated.
- Page hasn't finished loading (e.g. dynamic content).
- Element is covered by another element (cookie banner, sticky header).
**Solutions**:
- **Check Trace**: Open the trace viewer (`npx playwright show-trace`) to see exactly what the page looked like.
- **Auto-waiting**: Ensure you are using `await` on all async actions.
- **Visibility**: Use `await expect(locator).toBeVisible()` before interacting if uncertain.
- **Force Click**: In rare cases, use `.click({ force: true })` but prefer fixing the obstruction.

### 2. "BASE_ADMIN_URL is not defined"
**Symptoms**: Admin portal tests fail immediately.
**Causes**:
- Environment variable `BASE_ADMIN_URL` is missing from `.env` or pipeline variables.
**Solutions**:
- Ensure `.env` exists in `playwright-tests/` and contains `BASE_ADMIN_URL`.
- Check Azure DevOps variable library for the secret.

### 3. Tests fail in WebKit (Safari) but pass in Chromium
**Symptoms**: Specific browser failures.
**Causes**:
- Safari rendering differences (e.g., date inputs, validation bubbles).
- Network handling differences.
**Solutions**:
- Debug specifically with `npx playwright test --project=webkit --debug`.
- Use `page.screenshot()` to visually inspect the state in WebKit.

### 4. Admin Portal Access Denied (401/403)
**Symptoms**: Tests fail to access admin pages.
**Causes**:
- Incorrect Basic Auth credentials.
- IP allowlisting restrictions (rare in test env).
**Solutions**:
- Verify `DEV_USERNAME` and `DEV_PASSWORD` in `.env`.
- Ensure the `navigation.js` utility is correctly constructing the URL with credentials.

## Debugging Tools

### Trace Viewer
The most powerful tool. Enabled via `trace: 'on-first-retry'` in config.
To view a trace from CI or local failure:
```bash
npx playwright show-trace path/to/trace.zip
```

### UI Mode
Run tests with a time-travel debugger:
```bash
npx playwright test --ui
```

### Inspector
Step through code line-by-line:
```bash
npx playwright test --debug
```

### VS Code Extension
Install the "Playwright Test for VSCode" extension to run/debug tests directly from the editor.
