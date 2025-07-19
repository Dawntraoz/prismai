// This test is used to generate code for Playwright tests.
// It uses the Playwright Test Runner with a custom fixture to load the extension.
// https://playwrightsolutions.com/how-to-load-a-custom-test-fixture-or-setup-projects-when-running-playwright-test-code-generator/

import { test } from "./fixtures";

test('start codegen', {
  tag: ['@codegen'],
}, async ({ page }) => {
  // From the Playwright Inspector, click Record to start a new session.
  // This creates a new script, set the target to Test Runner, and then copy/paste the code to your tests.
  await page.pause();
});