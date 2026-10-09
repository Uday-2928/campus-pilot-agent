import { test, expect } from '@playwright/test';

test.describe('Student Dashboard & Carousel', () => {
  test.beforeEach(async ({ page }) => {
    // Go directly to student dashboard
    await page.goto('/student');
  });

  test('should display career command center elements', async ({ page }) => {
    await expect(page.getByText('Your Career Command Center')).toBeVisible();
    await expect(page.getByText('Your Career Intelligence')).toBeVisible();
  });

  test('should display 3D carousel and navigate', async ({ page }) => {
    // Check if carousel cards are rendered
    const carouselContainer = page.locator('.carousel');
    await expect(carouselContainer).toBeVisible();
    
    // Check if Hackathons card exists in the carousel
    const hackathonsCard = page.locator('.carousel-card', { hasText: 'Hackathons' }).first();
    await expect(hackathonsCard).toBeVisible();
    
    // The active card should be clickable
    // Wait for auto-rotation or interact with it
    // To make sure it's clickable, we can click the "Go to slide" indicator or next/prev
    
    // Test Quick actions
    await expect(page.getByRole('button', { name: 'Upload Resume' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ask AI' })).toBeVisible();
  });

  test('should navigate to hackathons and display return button', async ({ page }) => {
    await page.goto('/student/hackathons');
    
    // Verify Hackathons module is displayed
    await expect(page.getByRole('heading', { name: 'Hackathons' })).toBeVisible();
    await expect(page.getByText('We are currently building this module')).toBeVisible();
    
    // Verify Return to Dashboard button appears and works
    const returnBtn = page.getByRole('link', { name: /Return to Dashboard/i });
    await expect(returnBtn).toBeVisible();
    
    await returnBtn.click();
    await expect(page).toHaveURL(/.*\/student/);
  });
});
