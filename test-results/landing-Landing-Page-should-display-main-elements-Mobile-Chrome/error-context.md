# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> Landing Page >> should display main elements
- Location: tests\e2e\landing.spec.ts:4:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/login/
Received string:  "http://localhost:3000/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    7 × locator resolved to <html lang="en" class="light">…</html>
      - unexpected value "http://localhost:3000/"

```

```yaml
- banner:
  - text: C A M P U S P I L O T
  - navigation:
    - link "About":
      - /url: "#"
    - link "Features":
      - /url: "#"
      - text: Features
      - img
    - link "Students":
      - /url: "#"
    - link "Universities":
      - /url: "#"
    - link "Contact":
      - /url: "#"
    - link "About Us":
      - /url: "#"
  - text: EN
  - link "Student Portal":
    - /url: /login
- main:
  - heading "Campus Pilot" [level=1]
  - paragraph: Tailored AI opportunities for high-growth students and top-tier universities.
  - link "Explore Opportunities":
    - /url: /login
  - text: Scroll
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Landing Page', () => {
  4  |   test('should display main elements', async ({ page }) => {
  5  |     await page.goto('/');
  6  | 
  7  |     // Check header elements
  8  |     await expect(page.getByText('C A M P U S P I L O T')).toBeVisible();
  9  |     
  10 |     // Check navigation links
  11 |     await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
  12 |     await expect(page.getByRole('link', { name: 'Students' }).first()).toBeVisible();
  13 |     await expect(page.getByRole('link', { name: 'Universities' }).first()).toBeVisible();
  14 |     
  15 |     // Check main title
  16 |     await expect(page.getByRole('heading', { name: /Campus\s*Pilot/i })).toBeVisible();
  17 | 
  18 |     // Check "Explore Opportunities" link
  19 |     const exploreLink = page.getByRole('link', { name: 'Explore Opportunities' });
  20 |     await expect(exploreLink).toBeVisible();
  21 |     
  22 |     // Verify it navigates to login
  23 |     await exploreLink.click();
> 24 |     await expect(page).toHaveURL(/.*\/login/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  25 |   });
  26 | 
  27 |   test('Student Portal button navigates to login', async ({ page }) => {
  28 |     await page.goto('/');
  29 |     
  30 |     const portalButton = page.getByRole('link', { name: 'Student Portal' });
  31 |     await expect(portalButton).toBeVisible();
  32 |     
  33 |     await portalButton.click({ force: true });
  34 |     await expect(page).toHaveURL(/.*\/login/, { timeout: 15000 });
  35 |   });
  36 | });
  37 | 
```