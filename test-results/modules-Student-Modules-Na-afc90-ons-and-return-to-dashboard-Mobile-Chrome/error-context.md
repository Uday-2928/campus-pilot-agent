# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: modules.spec.ts >> Student Modules Navigation >> should navigate to Hackathons and return to dashboard
- Location: tests\e2e\modules.spec.ts:15:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/student\/hackathons/
Received string:  "http://localhost:3000/student/campus-drives"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    5 × locator resolved to <html lang="en" class="light">…</html>
      - unexpected value "http://localhost:3000/student"
    5 × locator resolved to <html lang="en" class="light">…</html>
      - unexpected value "http://localhost:3000/student/campus-drives"

```

```yaml
- main:
  - text: search
  - textbox "Search opportunities, internships, hackathons..."
  - button "notifications"
  - text: Aarav M.
  - link "arrow_back Return to Dashboard":
    - /url: /student
  - text: construction
  - heading "Campus Drives" [level=1]
  - paragraph: We are currently building this module. Check back soon for intelligent AI matching, insights, and opportunities.
- alert: Campus Drives
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { campusPilotModules } from '../../components/OpportunityCarousel/opportunityModules';
  3  | 
  4  | test.describe('Student Modules Navigation', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await page.goto('/student');
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
> 33 |       await expect(page).toHaveURL(new RegExp('.*' + mod.route), { timeout: 10000 });
     |                          ^ Error: expect(page).toHaveURL(expected) failed
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