import { test, expect } from '@playwright/test';
import { campusPilotModules } from '../../components/OpportunityCarousel/opportunityModules';

test.describe('Student Modules Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/student');
  });

  // Test the first 5 modules to avoid taking too long
  const testModules = campusPilotModules.slice(0, 5);

  for (let i = 0; i < testModules.length; i++) {
    const mod = testModules[i];
    
    test(`should navigate to ${mod.title} and return to dashboard`, async ({ page }) => {
      // Wait for the carousel to render
      await expect(page.locator('.carousel-card').first()).toBeVisible();

      // Click the specific slide indicator
      const slideBtn = page.getByLabel(`Go to slide ${i + 1}`);
      await slideBtn.click();
      
      // Wait for the rotation animation to finish
      await page.waitForTimeout(600);

      // Now the correct card is active. Click it!
      await page.locator('.carousel-card.active').click({ force: true });
      
      // Wait a moment for click animation (setTimeout 400ms in code)
      await page.waitForTimeout(500);
      
      // Should navigate to the module
      await expect(page).toHaveURL(new RegExp('.*' + mod.route), { timeout: 10000 });
      
      // Return button should be visible and work
      const returnBtn = page.getByRole('link', { name: /Return to Dashboard/i });
      await expect(returnBtn).toBeVisible();
      await returnBtn.click();
      
      // Should be back on the dashboard
      await expect(page).toHaveURL(/.*\/student/);
    });
  }
});
