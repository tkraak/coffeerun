import { test, expect } from '@playwright/test';

test.describe('place and fulfill coffee order', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('complete order workflow', async ({ page }) => {
    // Fill coffee order name
    await page.locator('[name="coffee"]').fill('TestOrder');
    await expect(page.locator('[name="coffee"]')).toHaveValue('TestOrder');

    // Fill email address
    await page.locator('[name="emailAddress"]').fill('test@test.com');
    await expect(page.locator('[name="emailAddress"]')).toHaveValue('test@test.com');

    // Select size
    await page.locator('input[name="size"][value="short"]').check();
    await expect(page.locator('input[name="size"][value="short"]')).toBeChecked();

    // Select flavor
    await page.locator('#flavor').selectOption('caramel');

    // Set strength
    await page.locator('#strength').fill('60');
    await page.locator('#strength').dispatchEvent('change');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Verify order was created
    const orderCheckbox = page.locator('[data-coffee-order="checkbox"] [value="test@test.com"]');
    await expect(orderCheckbox).toBeVisible();
    
    // Get the order label and verify the content
    const orderLabel = orderCheckbox.locator('xpath=ancestor::div[contains(@class, "checkbox")]/label');
    await expect(orderLabel).toContainText('test@test.com');

    // Fulfill order (use click instead of check to avoid timing issues)
    await orderCheckbox.click();
    
    // Verify order is no longer visible
    await expect(orderCheckbox).not.toBeVisible();
  });
});