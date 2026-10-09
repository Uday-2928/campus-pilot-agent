# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> Landing Page >> Student Portal button navigates to login
- Location: tests\e2e\landing.spec.ts:27:7

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]
  - alert [ref=e11]
  - main [ref=e12]:
    - generic [ref=e13]:
      - button "close" [ref=e14]
      - generic [ref=e17]:
        - button "Student" [ref=e18]
        - button "Admin" [ref=e19]
      - generic [ref=e20]:
        - generic [ref=e21]: S
        - generic [ref=e22]:
          - heading "Student Portal" [level=2] [ref=e23]
          - paragraph [ref=e24]: Sign in to continue
      - generic [ref=e25]:
        - button "Sign In" [ref=e26]
        - button "Sign Up" [ref=e27]
      - generic [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e30]: Email Address
          - textbox "Email Address" [ref=e31]:
            - /placeholder: you@university.edu
        - generic [ref=e32]:
          - generic [ref=e33]:
            - generic [ref=e34]: Password
            - link "Forgot?" [ref=e35] [cursor=pointer]:
              - /url: "#"
          - textbox "Password" [ref=e36]:
            - /placeholder: ••••••••
        - button "Sign In" [ref=e37]
      - generic [ref=e38]: OR CONTINUE WITH
      - generic [ref=e41]:
        - button [ref=e42]
        - button [ref=e48]
```