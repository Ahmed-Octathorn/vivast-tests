import { test, expect } from '@playwright/test';
import { loginWithOTP, loginWithCookie } from '../HelperFunction/helperFunctions';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.token!;


// TEST: Valid login with OTP from MailDev
test('Valid login with OTP from MailDev', async ({ page, request }) => {
  await loginWithCookie(page, token);
});


// TEST: Invalid login shows error message
test( 'Invalid login shows error message', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading')).toContainText('Login'); 
  await page.getByRole('textbox', { name: 'username@example.com' }).click();
  await page.locator('#password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('#root')).toContainText('Invalid credentials');
});