import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display main elements', async ({ page }) => {
    await page.goto('/');

    // Check header elements
    await expect(page.getByText('C A M P U S P I L O T')).toBeVisible();
    
    // Check navigation links
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Students' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Universities' }).first()).toBeVisible();
    
    // Check main title
    await expect(page.getByRole('heading', { name: /Campus\s*Pilot/i })).toBeVisible();

    // Check "Explore Opportunities" link
    const exploreLink = page.getByRole('link', { name: 'Explore Opportunities' });
    await expect(exploreLink).toBeVisible();
    
    // Verify it navigates to login
    await exploreLink.click();
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Student Portal button navigates to login', async ({ page }) => {
    await page.goto('/');
    
    const portalButton = page.getByRole('link', { name: 'Student Portal' });
    await expect(portalButton).toBeVisible();
    
    await portalButton.click({ force: true });
    await expect(page).toHaveURL(/.*\/login/, { timeout: 15000 });
  });
});
