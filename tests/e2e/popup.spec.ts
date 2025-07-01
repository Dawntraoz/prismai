import { test, expect } from "./fixtures";

test('has title', async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { name: 'PrismAI' })).toBeVisible();
});

test('get started link', async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  // Click the get started button.
  await page.getByRole('button', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Understand Web Content Instantly with AI' })).toBeVisible();
});
