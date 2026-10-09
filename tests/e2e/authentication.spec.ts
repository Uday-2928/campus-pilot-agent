import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Student Portal' })).toBeVisible();
    await expect(page.getByLabel(/Email Address/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should switch to admin login', async ({ page }) => {
    await page.getByRole('button', { name: 'Admin' }).click();
    await expect(page.getByRole('heading', { name: 'Admin Portal' })).toBeVisible();
  });

  test('should switch to sign up mode', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await expect(page.getByLabel(/Full Name/i)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  });

  test('student sign in should navigate to dashboard', async ({ page }) => {
    // Fill in required fields to bypass HTML5 validation
    await page.getByLabel(/Email Address/i).fill('student@test.com');
    await page.getByLabel(/Password/i).fill('password123');
    
    await page.locator('button[type="submit"]').click();
    
    // Should navigate to /student
    await expect(page).toHaveURL(/.*\/student/, { timeout: 15000 });
  });

  test('admin sign in should navigate to admin portal', async ({ page }) => {
    await page.getByRole('button', { name: 'Admin' }).click();
    
    // Fill in required fields
    await page.getByLabel(/Email Address/i).fill('admin@test.com');
    await page.getByLabel(/Password/i).fill('password123');
    
    await page.locator('button[type="submit"]').click();
    
    // Should navigate to /admin
    await expect(page).toHaveURL(/.*\/admin/, { timeout: 15000 });
  });

  test('close button should return to landing page', async ({ page }) => {
    // Assuming the close button is the one with the 'close' icon
    await page.getByRole('button').filter({ hasText: 'close' }).click();
    
    await expect(page).toHaveURL('http://localhost:3000/');
  });
});
