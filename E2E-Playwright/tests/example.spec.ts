import { test, expect } from '@playwright/test';

test.describe('Angular App E2E Tests', () => {
  test('should load the login page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('h2')).toContainText('Already Registered!! Login Here');
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/login');
    await page.click('text=New User.. Register Here');
    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator('h2')).toContainText('New User Registration Form');
  });
});
