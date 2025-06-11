# Podscribe Playwright E2E Automation

## 🎯 Project Description

This is an end-to-end test automation suite for the Podscribe application, using Playwright with TypeScript.  
It ensures that core features work reliably across different browsers using clean and maintainable code.

---

## ✅ Features

- **TypeScript-based** framework for strong typing and maintainability.
- **Playwright** integration for cross-browser end-to-end testing.
- **Page Object Model (POM)** for structured and reusable code.
- **Environment-specific configuration** via `.env` files.
- **GitHub Actions** ready for CI/CD pipelines.
- **Built-in test reporting** with Playwright reporters.

---

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mykhailoyerukhov/podscribe_playwright.git
   cd podscribe_playwright

2. Ensure Node.js is installed (recommended version: ≥ 18.x).

3. Install dependencies:

   ```bash
   npm install
   ```

4. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

---

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
BASE_URL=https://your-podscribe.dev
USERNAME=your_user
PASSWORD=your_pass
ENV=local
```

> ⚠️ Make sure `.env` is listed in `.gitignore`.

### 2. Playwright Config

Edit `playwright.config.ts` to adjust test timeouts, parallelism, retries, etc.

---

## 📂 Project Structure

```plaintext
├── .github/workflows/       # GitHub Actions workflow
├── helpers/                 # Custom helper functions
├── page-objects/            # Page Object Models
├── tests/                   # Test files
│   └── example.spec.ts
├── .env                     # Environment variables (not committed)
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Documentation
```


## 🌍 Multi-Environment Support

### 1. Install dotenv

```bash
npm install --save-dev dotenv
```

### 2. Create Environment Files

```env
# .env.local
BASE_URL=http://localhost:3000
USERNAME=local_user
PASSWORD=local_pass
```

You can also create `.env.staging`, `.env.production`, etc.



### 3. Add Scripts in package.json

```json
"scripts": {
    "test": "npx playwright test ./tests/discover-shows.spec.ts",
    "test:ui": "npx playwright test ./tests/discover-shows.spec.ts --ui",
    "test:debug": "npx playwright test ./tests/discover-shows.spec.ts --debug",
    "test:ci": "npx playwright test --reporter=html",
    "allure:generate": "allure generate allure-results --clean -o allure-report",
    "allure:open": "allure open allure-report"
  }
```

---

## ▶️ Running Tests

- Run all tests:

  ```bash
  npx playwright test
  ```

- Run in headed (non-headless) mode:

  ```bash
  npx playwright test --headed
  ```

---

## 📊 Generating Reports

Playwright comes with a built-in HTML reporter:

```bash
npx playwright show-report
```

---

## 🚀 CI/CD with GitHub Actions

The repo includes a GitHub Actions workflow (`.github/workflows/`) for automatic test execution on each push or pull request.

---
