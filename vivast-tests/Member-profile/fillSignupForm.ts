import { test, Page } from '@playwright/test';

export async function fillSignupForm(page: Page, email: string) {
  await test.step('Fill Basic Signup Information', async () => {
    await page.getByRole('textbox', { name: 'Enter your first name' }).fill('Automate');
    await page.getByRole('textbox', { name: 'Enter your last name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Enter your email' }).fill(email);
    await page.getByRole('textbox', { name: 'Enter your phone number' }).fill('+145231478941');
    await page.locator('#password').fill('12345678');
    await page.locator('#confirmPassword').fill('12345678');
  });
}