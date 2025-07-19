import { test, expect } from "./fixtures";

test.describe('Welcome Page', () => {
  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/welcome.html`);
  });

  test.describe('Page Structure and Title', () => {
    test('has correct title', async ({ page }) => {
      await expect(page).toHaveTitle(/Welcome to PrismAI/);
    });

    test('has main welcome page container', async ({ page }) => {
      await expect(page.locator('.welcome-page')).toBeVisible();
    });
  });

  test.describe('Header/Hero Section', () => {
    test('displays main title', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Unlock deeper meaning in everything you read' })).toBeVisible();
    });

    test('displays subtitle', async ({ page }) => {
      const subtitle = page.getByText('PrismAI is your personal reading assistant');
      await expect(subtitle).toBeVisible();
    });

    test('has action buttons', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'See how it works' })).toBeVisible();
      await expect(page.getByRole('button', { name: /Configure/ })).toBeVisible();
    });

    test('configure button opens options page', async ({ page, context }) => {
      // Click the configure button
      const [newPage] = await Promise.all([
        context.waitForEvent('page', p => p.url().includes('options.html')),
        page.getByRole('button', { name: /Configure/ }).click()
      ]);

      // Wait for the new page to load
      await newPage.waitForLoadState();

      // Verify the options page content
      await expect(newPage.getByRole('heading', { name: 'Settings' })).toBeVisible();
    });

    test('see how it works link navigates to get started section', async ({ page }) => {
      await page.getByRole('link', { name: 'See how it works' }).click();
      await expect(page.locator('#get-started')).toBeInViewport();
    });
  });

  test.describe('Features Section', () => {
    test('has features section heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'A smarter way to read the web' })).toBeVisible();
    });

    test('displays core features', async ({ page }) => {
      await expect(page.getByText('AI Enhancement')).toBeVisible();
      await expect(page.getByText('Private & secure')).toBeVisible();
    });

    test('displays feature descriptions', async ({ page }) => {
      await expect(page.getByText(/Never get stuck on a word or lost in a long article/)).toBeVisible();
      await expect(page.getByText(/PrismAI processes everything locally/)).toBeVisible();
    });

    test('displays detailed feature cards', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Explore Words' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Quick Summaries' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Smart Translation' })).toBeVisible();
    });

    test('feature cards have images', async ({ page }) => {
      const wordImage = page.getByAltText('PrismAI word selection showcase');
      const summaryImage = page.getByAltText('PrismAI sentence selection summarise action showcase');
      const translationImage = page.getByAltText('PrismAI sentence selection translate action showcase');

      await expect(wordImage).toBeVisible();
      await expect(summaryImage).toBeVisible();
      await expect(translationImage).toBeVisible();
    });
  });

  test.describe('Get Started Section', () => {
    test('has get started section', async ({ page }) => {
      await expect(page.locator('#get-started')).toBeVisible();
    });

    test('displays get started heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Get started in 3 simple steps' })).toBeVisible();
    });

    test('displays all three steps', async ({ page }) => {
      await expect(page.getByText('1', { exact: true })).toBeVisible();
      await expect(page.getByText('Highlight text')).toBeVisible();
      await expect(page.getByText('2', { exact: true })).toBeVisible();
      await expect(page.getByText('Choose your action')).toBeVisible();
      await expect(page.getByText('3', { exact: true })).toBeVisible();
      await expect(page.getByText('Get your insight')).toBeVisible();
    });

    test('displays demo image', async ({ page }) => {
      const demoImage = page.getByAltText('PrismAI behavior showcase in GIF format');
      await expect(demoImage).toBeVisible();
    });
  });

  test.describe('FAQ Section', () => {
    test('has FAQ section heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Everything you need to know' })).toBeVisible();
      await expect(page.getByText('Have questions? We have the answers.')).toBeVisible();
    });

    test('displays FAQ questions', async ({ page }) => {
      await expect(page.getByText('Is my reading data private?')).toBeVisible();
      await expect(page.getByText('Which browsers does PrismAI support?')).toBeVisible();
      await expect(page.getByText('Can I customize what appears in the menu?')).toBeVisible();
      await expect(page.getByText('Is PrismAI free to use?')).toBeVisible();
    });

    test('FAQ accordions are initially closed', async ({ page }) => {
      // Check that answers are not visible initially
      await expect(page.getByText('Absolutely. PrismAI uses your browser\'s built-in AI')).not.toBeVisible();
      await expect(page.getByText('Currently, PrismAI is available for Chrome')).not.toBeVisible();
    });

    test('clicking FAQ question opens accordion', async ({ page }) => {
      const firstQuestion = page.getByText('Is my reading data private?');
      await firstQuestion.click();

      // Check that the answer becomes visible
      await expect(page.getByText('Absolutely. PrismAI uses your browser\'s built-in AI')).toBeVisible();
    });

    test('clicking FAQ question again closes accordion', async ({ page }) => {
      const firstQuestion = page.getByText('Is my reading data private?');

      // Open accordion
      await firstQuestion.click();
      await expect(page.getByText('Absolutely. PrismAI uses your browser\'s built-in AI')).toBeVisible();

      // Close accordion
      await firstQuestion.click();
      await expect(page.getByText('Absolutely. PrismAI uses your browser\'s built-in AI')).not.toBeVisible();
    });

    test('multiple accordions can be open simultaneously', async ({ page }) => {
      // Open first accordion
      await page.getByText('Is my reading data private?').click();
      await expect(page.getByText('Absolutely. PrismAI uses your browser\'s built-in AI')).toBeVisible();

      // Open second accordion
      await page.getByText('Which browsers does PrismAI support?').click();
      await expect(page.getByText('Currently, PrismAI is available for Chrome')).toBeVisible();

      // Both should still be visible
      await expect(page.getByText('Absolutely. PrismAI uses your browser\'s built-in AI')).toBeVisible();
      await expect(page.getByText('Currently, PrismAI is available for Chrome')).toBeVisible();
    });

    test('FAQ accordion visual indicators work correctly', async ({ page }) => {
      const firstQuestionContainer = page.locator('.welcome-page__question').first();

      // Initially should have + indicator (closed state)
      await expect(firstQuestionContainer).not.toHaveClass(/open/);

      // Click to open
      await page.getByText('Is my reading data private?').click();

      // Should now have open class (- indicator)
      await expect(firstQuestionContainer).toHaveClass(/open/);
    });
  });

  test.describe('Footer', () => {
    test('displays footer with copyright', async ({ page }) => {
      await expect(page.locator('.welcome-page__footer')).toBeVisible();
      await expect(page.getByText(/© 2025.*PrismAI/)).toBeVisible();
    });

    test('displays developer credit with link', async ({ page }) => {
      await expect(page.getByText('Alba Silvente')).toBeVisible();

      const authorLink = page.getByRole('link', { name: '@dawntraoz' });
      await expect(authorLink).toBeVisible();
      await expect(authorLink).toHaveAttribute('href', 'https://www.dawntraoz.com/');
      await expect(authorLink).toHaveAttribute('target', '_blank');
    });
  });
});