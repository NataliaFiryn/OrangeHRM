import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { Navigation } from '../PageObjects/Navigation';
import { AdminPage } from '../PageObjects/AdminPage';
import { UserScenario } from '../TestData/User/UserScenarios';

const scenarios = Object.values(new UserScenario())

for (const scenario of scenarios)
test('Test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const navigate = new Navigation(page)
  const adminPage = new AdminPage(page)
  await page.goto('/');
  await loginPage.login();
  await navigate.navigateToPage('admin');
  await adminPage.searchByField('userRole', 'Admin')
  await adminPage.addUser(scenario)
});

