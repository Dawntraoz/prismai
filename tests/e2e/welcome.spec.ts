import { test, expect } from "./fixtures";

test('has title', async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/welcome.html`);
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Welcome to PrismAI/);
  await expect(page.getByRole('heading', { name: 'Unlock deeper meaning in everything you read' })).toBeVisible();
});