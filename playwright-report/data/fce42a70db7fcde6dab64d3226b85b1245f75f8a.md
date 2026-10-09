# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: modules.spec.ts >> Student Modules Navigation >> should navigate to My Opportunities and return to dashboard
- Location: tests\e2e\modules.spec.ts:15:9

# Error details

```
Error: locator.click: Error: strict mode violation: getByLabel('Go to slide 1') resolved to 5 elements:
    1) <button aria-label="Go to slide 1" class="h-2 rounded-full transition-all duration-300 w-8 bg-[#0284c7]"></button> aka getByRole('button', { name: 'Go to slide 1', exact: true })
    2) <button aria-label="Go to slide 10" class="h-2 rounded-full transition-all duration-300 w-2 bg-on-surface/20 hover:bg-on-surface/40"></button> aka getByRole('button', { name: 'Go to slide 10' })
    3) <button aria-label="Go to slide 11" class="h-2 rounded-full transition-all duration-300 w-2 bg-on-surface/20 hover:bg-on-surface/40"></button> aka getByRole('button', { name: 'Go to slide 11' })
    4) <button aria-label="Go to slide 12" class="h-2 rounded-full transition-all duration-300 w-2 bg-on-surface/20 hover:bg-on-surface/40"></button> aka getByRole('button', { name: 'Go to slide 12' })
    5) <button aria-label="Go to slide 13" class="h-2 rounded-full transition-all duration-300 w-2 bg-on-surface/20 hover:bg-on-surface/40"></button> aka getByRole('button', { name: 'Go to slide 13' })

Call log:
  - waiting for getByLabel('Go to slide 1')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e7]: search
        - textbox "Search opportunities, internships, hackathons..." [ref=e8]
      - generic [ref=e9]:
        - button "notifications" [ref=e10]
        - generic [ref=e12] [cursor=pointer]: Aarav M.
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]:
            - generic [ref=e19]: Good morning, Aarav 👋
            - heading "Your Career Intelligence" [level=1] [ref=e20]
            - paragraph [ref=e21]: We've found new opportunities based on your recent skill updates.
          - link "Update Profile" [ref=e22] [cursor=pointer]:
            - /url: /student/profile
        - generic [ref=e24]:
          - generic [ref=e25]: Profile Completion
          - generic [ref=e26]: 92%
      - generic [ref=e29]:
        - generic [ref=e30]:
          - heading "Your Career Command Center" [level=2] [ref=e31]
          - paragraph [ref=e32]: Explore AI-matched opportunities, training, and resources customized for your career goals.
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]:
              - button "Open My Opportunities" [ref=e36]:
                - generic [ref=e37] [cursor=pointer]:
                  - generic [ref=e38]: opportunities
                  - generic: target
                  - generic:
                    - heading "My Opportunities" [level=3]
                    - paragraph: Your next opportunity starts here.
                    - generic:
                      - generic: 24 Matches
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Campus Drives" [ref=e39]:
                - generic [ref=e40] [cursor=pointer]:
                  - generic [ref=e41]: placement
                  - generic: business
                  - generic:
                    - heading "Campus Drives" [level=3]
                    - paragraph: Get ready for placement season.
                    - generic:
                      - generic: 7 Upcoming
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Internships" [ref=e42]:
                - generic [ref=e43] [cursor=pointer]:
                  - generic [ref=e44]: internships
                  - generic: work
                  - generic:
                    - heading "Internships" [level=3]
                    - paragraph: Discover your next experience.
                    - generic:
                      - generic: 142 Open
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Hackathons" [ref=e45]:
                - generic [ref=e46] [cursor=pointer]:
                  - generic [ref=e47]: hackathons
                  - generic: emoji_events
                  - generic:
                    - heading "Hackathons" [level=3]
                    - paragraph: Build. Compete. Innovate.
                    - generic:
                      - generic: 18 Live
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Workshops" [ref=e48]:
                - generic [ref=e49] [cursor=pointer]:
                  - generic [ref=e50]: workshops
                  - generic: co_present
                  - generic:
                    - heading "Workshops" [level=3]
                    - paragraph: Learn something new.
                    - generic:
                      - generic: 12 Live
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Training & Prep" [ref=e51]:
                - generic [ref=e52] [cursor=pointer]:
                  - generic [ref=e53]: training
                  - generic: school
                  - generic:
                    - heading "Training & Prep" [level=3]
                    - paragraph: Practice. Improve. Succeed.
                    - generic:
                      - generic: 3 Active
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Skill Gap" [ref=e54]:
                - generic [ref=e55] [cursor=pointer]:
                  - generic [ref=e56]: skills
                  - generic: psychology
                  - generic:
                    - heading "Skill Gap" [level=3]
                    - paragraph: Discover what to learn next.
                    - generic:
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Resume Analyzer" [ref=e57]:
                - generic [ref=e58] [cursor=pointer]:
                  - generic [ref=e59]: resume
                  - generic: description
                  - generic:
                    - heading "Resume Analyzer" [level=3]
                    - paragraph: Make your resume stronger.
                    - generic:
                      - generic: "Score: 78/100"
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Applications" [ref=e60]:
                - generic [ref=e61] [cursor=pointer]:
                  - generic [ref=e62]: applications
                  - generic: task
                  - generic:
                    - heading "Applications" [level=3]
                    - paragraph: Track your career journey.
                    - generic:
                      - generic: 4 Pending
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Deadlines" [ref=e63]:
                - generic [ref=e64] [cursor=pointer]:
                  - generic [ref=e65]: deadlines
                  - generic: event
                  - generic:
                    - heading "Deadlines" [level=3]
                    - paragraph: Never miss an important date.
                    - generic:
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open AI Career Assistant" [ref=e66]:
                - generic [ref=e67] [cursor=pointer]:
                  - generic [ref=e68]: ai
                  - generic: smart_toy
                  - generic:
                    - heading "AI Career Assistant" [level=3]
                    - paragraph: Your career, intelligently guided.
                    - generic:
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Scholarships" [ref=e69]:
                - generic [ref=e70] [cursor=pointer]:
                  - generic [ref=e71]: funding
                  - generic: monetization_on
                  - generic:
                    - heading "Scholarships" [level=3]
                    - paragraph: Fund your education.
                    - generic:
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
              - button "Open Competitions" [ref=e72]:
                - generic [ref=e73] [cursor=pointer]:
                  - generic [ref=e74]: competitions
                  - generic: emoji_events
                  - generic:
                    - heading "Competitions" [level=3]
                    - paragraph: Showcase your talent.
                    - generic:
                      - generic:
                        - text: OPEN
                        - generic: arrow_forward
            - button "Previous module" [ref=e75]:
              - generic [ref=e76]: chevron_left
            - button "Next module" [ref=e77]:
              - generic [ref=e78]: chevron_right
          - generic [ref=e79]:
            - generic [ref=e80]: Campus Drives
            - generic [ref=e81]:
              - button "Go to slide 1" [ref=e82]
              - button "Go to slide 2" [ref=e83]
              - button "Go to slide 3" [ref=e84]
              - button "Go to slide 4" [ref=e85]
              - button "Go to slide 5" [ref=e86]
              - button "Go to slide 6" [ref=e87]
              - button "Go to slide 7" [ref=e88]
              - button "Go to slide 8" [ref=e89]
              - button "Go to slide 9" [ref=e90]
              - button "Go to slide 10" [ref=e91]
              - button "Go to slide 11" [ref=e92]
              - button "Go to slide 12" [ref=e93]
              - button "Go to slide 13" [ref=e94]
            - generic [ref=e95]: 02 / 13
          - generic [ref=e96]:
            - generic [ref=e97]: "Quick actions:"
            - button "Upload Resume" [ref=e98]
            - button "Find Internships" [ref=e99]
            - button "Hackathons" [ref=e100]
            - button "Track Applications" [ref=e101]
            - button "smart_toy Ask AI" [ref=e102]:
              - generic [ref=e103]: smart_toy
              - text: Ask AI
      - generic [ref=e104]:
        - generic [ref=e105]:
          - generic [ref=e106]: Profile completion
          - generic [ref=e107]: 92%
          - generic [ref=e108]: +8% this month
        - generic [ref=e109]:
          - generic [ref=e110]: Opportunities matched
          - generic [ref=e111]: "5"
          - generic [ref=e112]: Top recommendations
        - generic [ref=e113]:
          - generic [ref=e114]: Training streak
          - generic [ref=e115]: 14 days
          - generic [ref=e116]: Aptitude + technical
        - generic [ref=e117]:
          - generic [ref=e118]: Resume score
          - generic [ref=e119]: 78/100
          - generic [ref=e120]: Strong AI fit
      - generic [ref=e121]:
        - generic [ref=e122]:
          - heading "Recommended for you" [level=2] [ref=e123]
          - button "View all matches" [ref=e124]
        - generic [ref=e125]:
          - article [ref=e126]:
            - generic [ref=e127]:
              - generic [ref=e128]: hackathon
              - generic [ref=e129]:
                - generic [ref=e130]: auto_awesome
                - text: Match 98%
            - heading "Full Stack Buildathon" [level=3] [ref=e131]
            - paragraph [ref=e132]: DevCommunity
            - generic [ref=e133]:
              - generic [ref=e134]:
                - generic [ref=e135]: calendar_today
                - strong [ref=e137]: 10/19/2026
              - generic [ref=e138]:
                - generic [ref=e139]: location_on
                - generic [ref=e140]: Online (online)
              - generic [ref=e141]:
                - generic [ref=e142]: code
                - generic [ref=e143]: React, Node.js, PostgreSQL
            - generic [ref=e144]:
              - strong [ref=e145]: "Why recommended:"
              - text: Build a complete scalable web application from scratch over the weekend.... Based on your skills in React, Node.js, this is a strong semantic fit for your profile!
            - generic [ref=e146]:
              - link "Apply Now" [ref=e147] [cursor=pointer]:
                - /url: https://example.com/fullstack
              - button "bookmark_border" [ref=e148]
          - article [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]: competition
              - generic [ref=e153]:
                - generic [ref=e154]: auto_awesome
                - text: Match 75%
            - heading "Cybersecurity Capture The Flag" [level=3] [ref=e155]
            - paragraph [ref=e156]: SecurIT
            - generic [ref=e157]:
              - generic [ref=e158]:
                - generic [ref=e159]: calendar_today
                - strong [ref=e161]: 10/14/2026
              - generic [ref=e162]:
                - generic [ref=e163]: location_on
                - generic [ref=e164]: Hybrid (hybrid)
              - generic [ref=e165]:
                - generic [ref=e166]: code
                - generic [ref=e167]: Linux, Networking, Cybersecurity
            - generic [ref=e168]:
              - strong [ref=e169]: "Why recommended:"
              - text: A 24-hour CTF competition testing network security and cryptography skills.... Based on your skills in Linux, Networking, this is a strong semantic fit for your profile!
            - generic [ref=e170]:
              - link "Apply Now" [ref=e171] [cursor=pointer]:
                - /url: https://example.com/cyber-ctf
              - button "bookmark_border" [ref=e172]
          - article [ref=e174]:
            - generic [ref=e175]:
              - generic [ref=e176]: competition
              - generic [ref=e177]:
                - generic [ref=e178]: auto_awesome
                - text: Match 79%
            - heading "AI Innovation Challenge" [level=3] [ref=e179]
            - paragraph [ref=e180]: NextGen AI
            - generic [ref=e181]:
              - generic [ref=e182]:
                - generic [ref=e183]: calendar_today
                - strong [ref=e185]: 10/23/2026
              - generic [ref=e186]:
                - generic [ref=e187]: location_on
                - generic [ref=e188]: Remote (online)
              - generic [ref=e189]:
                - generic [ref=e190]: code
                - generic [ref=e191]: Python, Machine Learning, Generative AI
            - generic [ref=e192]:
              - strong [ref=e193]: "Why recommended:"
              - text: Solve real-world problems using cutting-edge generative AI models.... Based on your skills in Python, Machine Learning, this is a strong semantic fit for your profile!
            - generic [ref=e194]:
              - link "Apply Now" [ref=e195] [cursor=pointer]:
                - /url: https://example.com/ai-challenge
              - button "bookmark_border" [ref=e196]
          - article [ref=e198]:
            - generic [ref=e199]:
              - generic [ref=e200]: workshop
              - generic [ref=e201]:
                - generic [ref=e202]: auto_awesome
                - text: Match 77%
            - heading "Cloud & DevOps Workshop" [level=3] [ref=e203]
            - paragraph [ref=e204]: CloudNest Academy
            - generic [ref=e205]:
              - generic [ref=e206]:
                - generic [ref=e207]: calendar_today
                - strong [ref=e209]: 10/12/2026
              - generic [ref=e210]:
                - generic [ref=e211]: location_on
                - generic [ref=e212]: Online (online)
              - generic [ref=e213]:
                - generic [ref=e214]: code
                - generic [ref=e215]: AWS, Docker, Git
            - generic [ref=e216]:
              - strong [ref=e217]: "Why recommended:"
              - text: Learn the fundamentals of Cloud deployment and CI/CD pipelines.... Based on your skills in AWS, Docker, this is a strong semantic fit for your profile!
            - generic [ref=e218]:
              - link "Apply Now" [ref=e219] [cursor=pointer]:
                - /url: https://example.com/cloud-workshop
              - button "bookmark_border" [ref=e220]
          - article [ref=e222]:
            - generic [ref=e223]:
              - generic [ref=e224]: hackathon
              - generic [ref=e225]:
                - generic [ref=e226]: auto_awesome
                - text: Match 78%
            - heading "Robotics Hackathon" [level=3] [ref=e227]
            - paragraph [ref=e228]: TechSpark Labs
            - generic [ref=e229]:
              - generic [ref=e230]:
                - generic [ref=e231]: calendar_today
                - strong [ref=e233]: 10/16/2026
              - generic [ref=e234]:
                - generic [ref=e235]: location_on
                - generic [ref=e236]: Bengaluru (in_person)
              - generic [ref=e237]:
                - generic [ref=e238]: code
                - generic [ref=e239]: Robotics, IoT, C++
            - generic [ref=e240]:
              - strong [ref=e241]: "Why recommended:"
              - text: A 48-hour hackathon focused on building next-generation robotics solutions.... Based on your skills in Robotics, IoT, this is a strong semantic fit for your profile!
            - generic [ref=e242]:
              - link "Apply Now" [ref=e243] [cursor=pointer]:
                - /url: https://example.com/robotics-hackathon
              - button "bookmark_border" [ref=e244]
      - generic [ref=e246]:
        - generic [ref=e247]:
          - heading "Training for you" [level=2] [ref=e248]
          - button "Open complete roadmap" [ref=e249]
        - generic [ref=e250]:
          - article [ref=e251] [cursor=pointer]:
            - generic [ref=e252]: Intermediate
            - heading "Python for Data & ML" [level=3] [ref=e253]
            - generic [ref=e254]:
              - generic [ref=e255]: schedule
              - text: 4 weeks
          - article [ref=e256] [cursor=pointer]:
            - generic [ref=e257]: Beginner
            - heading "SQL & Data Analysis" [level=3] [ref=e258]
            - generic [ref=e259]:
              - generic [ref=e260]: schedule
              - text: 2 weeks
          - article [ref=e261] [cursor=pointer]:
            - generic [ref=e262]: Advanced
            - heading "Interview Preparation" [level=3] [ref=e263]
            - generic [ref=e264]:
              - generic [ref=e265]: schedule
              - text: 3 weeks
  - button "Open Next.js Dev Tools" [ref=e271] [cursor=pointer]
  - alert [ref=e275]
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
> 21 |       await slideBtn.click();
     |                      ^ Error: locator.click: Error: strict mode violation: getByLabel('Go to slide 1') resolved to 5 elements:
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