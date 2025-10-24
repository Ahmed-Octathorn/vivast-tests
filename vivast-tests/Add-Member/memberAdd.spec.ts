import { test, expect} from '@playwright/test';
import { loginWithCookie, loginWithOTP } from '../HelperFunction/helperFunctions';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.token!;

// TEST: Add Member from admin
test('Add Member from admin', async ({ page, request }) => {
  // First login
  await loginWithCookie(page, token);

  await test.step('Navigate to Add Member form', async () => {
    await page.goto('/admin/members');
    await page.getByRole('button', { name: 'Add Member' }).click();
  });

  await test.step('Fill Basic Information', async () => {
    // Fill basic details
    await page.getByRole('textbox', { name: 'John' }).fill('John');
    await page.getByRole('textbox', { name: 'Doe' }).fill('Doe');

    const randomId = Date.now();
    const email = `automate${randomId}@test.com`;

    await page.getByRole('textbox', { name: 'e.g. J.Stevenson@gmail.com' }).fill(email);
    await page.getByRole('textbox', { name: '+1-202-555-' }).fill('+123456478956');

    // Handle date picker
    await page.getByRole('button', { name: 'Pick a date' }).click();
    await page.getByLabel('Choose the Month').selectOption('5');
    await page.getByLabel('Choose the Year').selectOption('2000');
    await page.getByRole('button', { name: /June 8/i }).click();

    // Handle gender selection
    await page.getByRole('dialog', { name: 'Add Member' })
             .getByRole('combobox')
             .click();
    await page.getByRole('option', { name: 'Female', exact: true }).click();
    
    await page.getByRole('textbox', { name: 'e.g. House No.' }).fill('house 123');
  });

  await test.step('Fill Emergency Contact Info', async () => {
    await page.getByRole('tab', { name: 'Emergency Contact Info' }).click();
    
    // Fill emergency contact details
    await page.getByRole('textbox', { name: 'Jane Doe' }).fill('jane Doe');
    await page.getByRole('textbox', { name: '+1-202-555-0180' }).fill('+123456467856');
    await page.getByRole('textbox', { name: 'e.g. Mother, Father, Friend' }).fill('Brother');
    await page.getByRole('textbox', { name: '+1-202-555-0190' }).fill('+13245646512');
    await page.getByRole('textbox', { name: 'Additional notes' }).fill('Test');
  });

  await test.step('Fill Address Information', async () => {
    // Fill address details
    await page.locator('#city').fill('New York');
    await page.locator('#state').fill('LA');
    await page.getByRole('textbox', { name: 'e.g. 10001' }).fill('23031');
    await page.getByRole('textbox', { name: 'e.g. United States' }).fill('USA');
  });

  await test.step('Set Password and Submit', async () => {
    await page.getByRole('tab', { name: 'Password Settings' }).click();
    
    // Fill password fields
    await page.locator('#password').fill('12345678');
    await page.locator('#confirmPassword').fill('12345678');

    // Submit the form and wait for it to process
    await page.getByRole('button', { name: 'Add' }).click();
  });
});

// TEST: Add Member from admin Required Fields
test('Add Member from admin Required Fields', async ({ page, request }) => {
  // First login
  await loginWithCookie(page, token);

  await test.step('Navigate to Add Member form', async () => {
    await page.goto('/admin/members');
    await page.getByRole('button', { name: 'Add Member' }).click();
    await page.waitForLoadState('networkidle');
  });

  await test.step('Fill Basic Information Required Fields', async () => {
    // Fill basic details
    await page.getByRole('textbox', { name: 'John' }).fill('John');
    await page.getByRole('textbox', { name: 'Doe' }).fill('Doe');

    const randomId = Date.now();
    const email = `automate${randomId}@test.com`;

    await page.getByRole('textbox', { name: 'e.g. J.Stevenson@gmail.com' }).fill(email);
    await page.getByRole('textbox', { name: '+1-202-555-' }).fill('+123456478956');

    // Handle date picker
    await page.getByRole('button', { name: 'Pick a date' }).click();
    await page.getByLabel('Choose the Month').selectOption('5');
    await page.getByLabel('Choose the Year').selectOption('2000');
    await page.getByRole('button', { name: /June 8/i }).click();

  })

  await test.step('Set Password', async () => {
    await page.getByRole('tab', { name: 'Password Settings' }).click();
    
    // Fill password fields
    await page.locator('#password').fill('12345678');
    await page.locator('#confirmPassword').fill('12345678');

  });
  await test.step('Submit the form', async () => {
    Promise.all([
      await page.getByRole('button', { name: 'Add' }).click(),
    ]);
  });
  await page.waitForLoadState('networkidle');
});

// TEST: Invalid Add Member shows error message
test('Invalid Add Member shows error message', async ({ page, request }) => {
  // First login
  await loginWithCookie(page, token);

  await test.step('Navigate to Add Member form', async () => {
    await page.goto('/admin/members');
    await page.getByRole('button', { name: 'Add Member' }).click();
    await page.waitForLoadState('networkidle');
  });

  await test.step('Click on Add button without Fill information', async () => {
    // Submit the form and wait for it to process
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Target the Add Member dialog instead of the whole page
    const modal = page.getByRole('dialog', { name: 'Add Member' });
    await expect(modal.getByText('Please fix errors in the highlighted tab')).toBeVisible();

    await page.waitForLoadState('networkidle');
  });
});