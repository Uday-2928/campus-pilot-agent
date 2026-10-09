# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: modules.spec.ts >> Student Modules Navigation >> should navigate to Resume Analyzer and return to dashboard
- Location: tests\e2e\modules.spec.ts:15:9

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/student", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { campusPilotModules } from '../../components/OpportunityCarousel/opportunityModules';
  3  | 
  4  | test.describe('Student Modules Navigation', () => {
  5  |   test.beforeEach(async ({ page }) => {
> 6  |     await page.goto('/student');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  7  |   });
  8  | 
  9  |   // Test the first 5 modules to avoid taking too long
  10 |   const testModules = campusPilotModules.slice(0, 5);
  11 | 
  12 |   for (let i = 0; i < testModules.length; i++) {
  13 |     const mod = testModules[i];
  14 |     
  15 |     test(`should navigate to ${mod.title} and return to dashboard`, async ({ page }) => {
  16 |       // Wait for the carousel to render
  17 |       await expect(page.locator('.carousel-card').first()).toBeVisible();
  18 | 
  19 |       // Click the specific slide indicator
  20 |       const slideBtn = page.getByLabel(`Go to slide ${i + 1}`);
  21 |       await slideBtn.click();
  22 |       
  23 |       // Wait for the rotation animation to finish
  24 |       await page.waitForTimeout(600);
  25 | 
  26 |       // Now the correct card is active. Click it!
  27 |       await page.locator('.carousel-card.active').click({ force: true });
  28 |       
  29 |       // Wait a moment for click animation (setTimeout 400ms in code)
  30 |       await page.waitForTimeout(500);
  31 |       
  32 |       // Should navigate to the module
  33 |       await expect(page).toHaveURL(new RegExp('.*' + mod.route), { timeout: 10000 });
  34 |       
  35 |       // Return button should be visible and work
  36 |       const returnBtn = page.getByRole('link', { name: /Return to Dashboard/i });
  37 |       await expect(returnBtn).toBeVisible();
  38 |       await returnBtn.click();
  39 |       
  40 |       // Should be back on the dashboard
  41 |       await expect(page).toHaveURL(/.*\/student/);
  42 |     });
  43 |   }
  44 | });
  45 | 
```