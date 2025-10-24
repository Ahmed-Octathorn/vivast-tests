import { test, expect, Page } from '@playwright/test';
import { fillSignupForm } from './fillSignupForm';

// TEST: Full Signup Flow

// test('Valid Signup Flow Stripe Payment - Complete to Dashboard', async ({ page }) => {
//   await test.step('Navigate to Signup Page', async () => {
//     await page.goto(/* SIGNUP_URL */'/signup');
//     await expect(page).toHaveURL(/.*signup/);
//   });

//   // Create a unique email to avoid duplicates
//   const randomId = Date.now();
//   const email = `automate${randomId}@test.com`;

//   await fillSignupForm(page, email);

//   await test.step('Submit Signup Form', async () => {
//     await Promise.all([
//     page.getByRole('button', { name: 'Register' }).click(),
//     ]);
//   });

//   // ---------- Complete Profile ----------
//   await test.step('Complete Profile Details', async () => {
//     await expect(page.locator('h2')).toHaveText(/Complete Your Profile/i);

//     await page.getByRole('combobox').click();
//     await page.getByRole('option', { name: 'Male', exact: true }).click();

//     await page.getByRole('button', { name: 'Pick a date' }).click();
//     await page.getByLabel('Choose the Month').selectOption('5');
//     await page.getByLabel('Choose the Year').selectOption('2000');
//     await page.getByRole('button', { name: /June 8/i }).click();

//     await page.getByRole('textbox', { name: 'Enter your street address' }).fill('House number 343');
//     await page.getByRole('textbox', { name: 'Enter your city' }).fill('San Francisco');
//     await page.getByRole('textbox', { name: 'Enter your state' }).fill('California');
//     await page.getByRole('textbox', { name: 'Enter ZIP code' }).fill('12345');

//     await Promise.all([
//       page.waitForSelector('text=Choose Your Membership Plan', { timeout: 10000 }),
//       page.getByRole('button', { name: 'Continue' }).click(),
//     ]);
//   });

//   // ---------- Choose Plan ----------
//   await test.step('Select Random Membership Plan', async () => {
//     // Wait for the membership plans to load
//     await expect(page.locator('h2')).toContainText('Choose Your Membership Plan');

//     // Find all available "Select Plan" buttons
//     const plans = page.getByRole('button', { name: /^Select Plan$/ });
//     const planCount = await plans.count();

//     // Ensure there is at least one plan to select
//     expect(planCount, 'No membership plans found!').toBeGreaterThan(0);

//     // Random index between 0 and planCount - 1
//     const randomIndex = Math.floor(Math.random() * planCount);

//     // Log the index and total plans for clarity
//     console.log(`Found ${planCount} plans, selecting plan index: ${randomIndex}`);

//     // Click the randomly selected plan
//     await plans.nth(randomIndex).click();

//     // Continue the signup flow
//     await Promise.all([
//     await page.getByRole('button', { name: 'Next' }).click(),
//     ]);
//   });

//   // ---------- Payment ----------
//   await test.step('Enter Payment Details', async () => {
//     await page.locator('div').filter({ hasText: /^Stripestripe$/ }).first().click();
//     await page.getByRole('checkbox', { name: /I have read and accept/i }).check();

//     await Promise.all([
//       page.getByRole('button', { name: 'Continue to Payment' }).click(),
//     ]);

//     await page.waitForLoadState("domcontentloaded");
//     await expect(page.locator('main')).toContainText('Enter payment details');

//     await page.getByRole('textbox', { name: 'Card number' }).fill('4242 4242 4242 4242');
//     await page.getByRole('textbox', { name: 'Expiration' }).fill('06 / 29');
//     await page.getByRole('textbox', { name: 'CVC' }).fill('452');
//     await page.getByRole('textbox', { name: 'Cardholder name' }).fill('Automate Test');

//     await Promise.all([
//       page.getByTestId('hosted-payment-submit-button').click(),
//       page.waitForSelector('text=Payment Successful', { timeout: 200000 }),
//     ]);
//   });

//   // ---------- Dashboard ----------
//   await test.step('Verify Redirect to Dashboard', async () => {
//     await expect(page.getByRole('heading')).toContainText('Payment Successful');
//     await page.getByRole('button', { name: 'Continue to Dashboard' }).click();
//     await expect(page.locator('h1')).toContainText('Dashboard');
//   });
// });

test('InValid Signup Flow Stripe Payment - Complete to Dashboard', async ({ page }) => {
  await test.step('Navigate to Signup Page', async () => {
    await page.goto(/* SIGNUP_URL */'/signup');
    await expect(page).toHaveURL(/.*signup/);
  });

  // Create a unique email to avoid duplicates
  const randomId = Date.now();
  const email = `automate${randomId}@test.com`;

  await fillSignupForm(page, email);

  await test.step('Submit Signup Form', async () => {
    await Promise.all([
    page.getByRole('button', { name: 'Register' }).click(),
    ]);
  });

  // ---------- Complete Profile ----------
  await test.step('Complete Profile Details', async () => {
    await expect(page.locator('h2')).toHaveText(/Complete Your Profile/i);

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Male', exact: true }).click();

    await page.getByRole('button', { name: 'Pick a date' }).click();
    await page.getByLabel('Choose the Month').selectOption('5');
    await page.getByLabel('Choose the Year').selectOption('2000');
    await page.getByRole('button', { name: /June 8/i }).click();

    await page.getByRole('textbox', { name: 'Enter your street address' }).fill('House number 343');
    await page.getByRole('textbox', { name: 'Enter your city' }).fill('San Francisco');
    await page.getByRole('textbox', { name: 'Enter your state' }).fill('California');
    await page.getByRole('textbox', { name: 'Enter ZIP code' }).fill('12345');

    await Promise.all([
      page.waitForSelector('text=Choose Your Membership Plan', { timeout: 10000 }),
      page.getByRole('button', { name: 'Continue' }).click(),
    ]);
  });

  // ---------- Choose Plan ----------
  await test.step('Select Random Membership Plan', async () => {
    // Wait for the membership plans to load
    await expect(page.locator('h2')).toContainText('Choose Your Membership Plan');

    // Find all available "Select Plan" buttons
    const plans = page.getByRole('button', { name: /^Select Plan$/ });
    const planCount = await plans.count();

    // Ensure there is at least one plan to select
    expect(planCount, 'No membership plans found!').toBeGreaterThan(0);

    // Random index between 0 and planCount - 1
    const randomIndex = Math.floor(Math.random() * planCount);

    // Log the index and total plans for clarity
    console.log(`Found ${planCount} plans, selecting plan index: ${randomIndex}`);

    // Click the randomly selected plan
    await plans.nth(randomIndex).click();

    // Continue the signup flow
    await Promise.all([
    await page.getByRole('button', { name: 'Next' }).click(),
    ]);
  });

  // ---------- Payment ----------
  await test.step('Enter Payment Details', async () => {
    await page.locator('div').filter({ hasText: /^Stripestripe$/ }).first().click();
    await page.getByRole('checkbox', { name: /I have read and accept/i }).check();

    await Promise.all([
      page.getByRole('button', { name: 'Continue to Payment' }).click(),
    ]);


    await page.waitForLoadState("domcontentloaded");

    await Promise.all([
      await page.getByTestId('business-link').click(),
      await page.waitForLoadState("networkidle"),
    ]);
  });

  // ---------- Dashboard ----------
  await test.step('Payment Cancelled', async () => {
    await expect(page.getByRole('heading')).toContainText('Payment Cancelled');
      await page.getByRole('button', { name: 'Go back to Membership' }).click(),
      await expect(page.locator('h1')).toContainText('Dashboard')
  });


});

// TEST: Full Signup Flow with Cash Payment

test('Valid Signup Flow Cash Payment - Complete to Dashboard', async ({ page }) => {
  await test.step('Navigate to Signup Page', async () => {
    await page.goto(/* SIGNUP_URL */'/signup');
    await expect(page).toHaveURL(/.*signup/);
  });

  // Create a unique email to avoid duplicates
  const randomId = Date.now();
  const email = `automate${randomId}@test.com`;

  await fillSignupForm(page, email);

  await test.step('Submit Signup Form', async () => {
    await Promise.all([
    page.getByRole('button', { name: 'Register' }).click(),
    ]);
  });

  // ---------- Complete Profile ----------
  await test.step('Complete Profile Details', async () => {
    await expect(page.locator('h2')).toHaveText(/Complete Your Profile/i);

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Male', exact: true }).click();

    await page.getByRole('button', { name: 'Pick a date' }).click();
    await page.getByLabel('Choose the Month').selectOption('5');
    await page.getByLabel('Choose the Year').selectOption('2000');
    await page.getByRole('button', { name: /June 8/i }).click();

    await page.getByRole('textbox', { name: 'Enter your street address' }).fill('House number 343');
    await page.getByRole('textbox', { name: 'Enter your city' }).fill('San Francisco');
    await page.getByRole('textbox', { name: 'Enter your state' }).fill('California');
    await page.getByRole('textbox', { name: 'Enter ZIP code' }).fill('12345');

    await Promise.all([
      page.waitForSelector('text=Choose Your Membership Plan', { timeout: 10000 }),
      page.getByRole('button', { name: 'Continue' }).click(),
    ]);
  });

  // ---------- Choose Plan ----------
  await test.step('Select Random Membership Plan', async () => {
    // Wait for the membership plans to load
    await expect(page.locator('h2')).toContainText('Choose Your Membership Plan');

    // Find all available "Select Plan" buttons
    const plans = page.getByRole('button', { name: /^Select Plan$/ });
    const planCount = await plans.count();

    // Ensure there is at least one plan to select
    expect(planCount, 'No membership plans found!').toBeGreaterThan(0);

    // Random index between 0 and planCount - 1
    const randomIndex = Math.floor(Math.random() * planCount);

    // Log the index and total plans for clarity
    console.log(`Found ${planCount} plans, selecting plan index: ${randomIndex}`);

    // Click the randomly selected plan
    await plans.nth(randomIndex).click();

    // Continue the signup flow
    await Promise.all([
    await page.getByRole('button', { name: 'Next' }).click(),
    ]);
  });

  // ---------- Payment ----------
  await test.step('Enter Payment Details', async () => {
    await page.locator('div').filter({ hasText: /^Cashcash$/ }).nth(1).click();
    await page.getByRole('checkbox', { name: /I have read and accept/i }).check();

    await Promise.all([
      page.getByRole('button', { name: 'Continue to Payment' }).click(),
    ]);

    await Promise.all([
      page.waitForSelector('text=Payment Successful', { timeout: 200000 }),
    ]);
  });
  
  await page.waitForLoadState("domcontentloaded");
  
  // ---------- Dashboard ----------
  await test.step('Verify Redirect to Dashboard', async () => {
    await expect(page.getByRole('heading')).toContainText('Payment Successful');
    await page.getByRole('button', { name: 'Continue to Dashboard' }).click();
    await expect(page.locator('h1')).toContainText('Dashboard');
  });
});
