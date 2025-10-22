import { test, expect } from '@playwright/test';

const SIGNUP_URL = '/signup';

//  Valid signup — already in your code
test('Valid Signup', async ({ page }) => {
  await page.goto(SIGNUP_URL);

  await page.getByRole('textbox', { name: 'Enter your first name' }).fill('automate');
  await page.getByRole('textbox', { name: 'Enter your last name' }).fill('test');

  const randomId = Date.now();
  const email = `automate+${randomId}@test.com`;
  await page.getByRole('textbox', { name: 'Enter your email' }).fill(email);

  await page.getByRole('textbox', { name: 'Enter your phone number' }).fill('+145231478941');
  await page.locator('#password').fill('12345678');
  await page.locator('#confirmPassword').fill('12345678');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.locator('h2')).toContainText(/Complete Your Profile/i, { timeout: 10000 });
});


//  Test 1: Empty form
test('Signup fails when all fields are empty', async ({ page }) => {
  await page.goto(SIGNUP_URL);
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText(/First Name is required/i)).toBeVisible();
});


// Test 2: Invalid email format
test('Signup fails with invalid email format', async ({ page }) => {
  await page.goto(SIGNUP_URL);

  await page.fill('input[name="firstName"]', 'auto');
  await page.fill('input[name="lastName"]', 'test');
  await page.fill('input[name="email"]', 'invalidemail'); // missing @
  await page.getByRole('textbox', { name: 'Enter your phone number' }).fill('+145231478941');
  await page.fill('#password', '12345678');
  await page.fill('#confirmPassword', '12345678');

  // Click Register to trigger validation
  await page.getByRole('button', { name: 'Register' }).click();

  // Get email input
  const emailInput = page.locator('input[name="email"]');

  // Check if it's invalid
  const isValid = await emailInput.evaluate((el) => (el as HTMLInputElement).checkValidity());
  expect(isValid).toBeFalsy();

  // Retrieve browser's native validation message
  const validationMessage = await emailInput.evaluate((el) => (el as HTMLInputElement).validationMessage);
  console.log('Validation message:', validationMessage);

  // Assert the message contains '@' or general invalid email hint
  expect(validationMessage).toMatch(/@|valid email/i);
});



//  Test 3: Password mismatch
test('Signup fails with mismatched passwords', async ({ page }) => {
  await page.goto(SIGNUP_URL);
  await page.fill('input[name="firstName"]', 'auto');
  await page.fill('input[name="lastName"]', 'test');
  const randomId = Date.now();
  await page.fill('input[name="email"]', `auto${randomId}@test.com`);
  await page.getByRole('textbox', { name: 'Enter your phone number' }).fill('+145231478941');
  await page.fill('#password', '12345678');
  await page.fill('#confirmPassword', '87654321');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText(/passwords.*match/i)).toBeVisible();
});


//  Test 4: Weak or short password
test('Signup fails with weak or too short password', async ({ page }) => {
  await page.goto(SIGNUP_URL);
  await page.fill('input[name="firstName"]', 'auto');
  await page.fill('input[name="lastName"]', 'test');
  const randomId = Date.now();
  await page.fill('input[name="email"]', `auto${randomId}@test.com`);
  await page.getByRole('textbox', { name: 'Enter your phone number' }).fill('+145231478941');
  await page.fill('#password', '123'); // too short
  await page.fill('#confirmPassword', '123');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText(/Password must be at least 8 characters/i)).toBeVisible();
});


//  Test 5: Missing required field (e.g., phone)
test('Signup fails when phone number is missing', async ({ page }) => {
  await page.goto(SIGNUP_URL);
  await page.fill('input[name="firstName"]', 'auto');
  await page.fill('input[name="lastName"]', 'test');
  const randomId = Date.now();
  await page.fill('input[name="email"]', `auto${randomId}@test.com`);
  await page.fill('#password', '12345678');
  await page.fill('#confirmPassword', '12345678');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText(/Phone number must be at least 13 digits/i)).toBeVisible();
});


//  Test 6: Duplicate email signup
test('Signup fails when email already exists', async ({ page }) => {
  await page.goto(SIGNUP_URL);
  await page.fill('input[name="firstName"]', 'auto');
  await page.fill('input[name="lastName"]', 'test');
  await page.fill('input[name="email"]', 'automate@test.com'); // already used
  await page.getByRole('textbox', { name: 'Enter your phone number' }).fill('+145231478941');
  await page.fill('#password', '12345678');
  await page.fill('#confirmPassword', '12345678');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText(/The email is already taken/i, { exact: true }).first()).toBeVisible();
});
