import { test, expect } from '@playwright/test';
import { loginWithCookie} from '../HelperFunction/helperFunctions';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.token!;

test.beforeEach(async ({ page, request }) => {
    await loginWithCookie(page, token);
});

test('Valid Add Staff from admin', async ({ page }) => {
    await test.step('Navigate to Add Staff form', async () => {
        await page.goto('/admin/staff');
        await page.getByRole('button', { name: 'Add Staff' }).click();
        await page.waitForLoadState('networkidle');
    });

    await test.step('Fill Staff Information', async () => {
        await page.getByRole('textbox', { name: 'John' }).fill('John');
        await page.getByRole('textbox', { name: 'Doe' }).fill('Doe');

        const randomId = Date.now();
        const email = `automate${randomId}@test.com`;

        await page.getByRole('textbox', { name: 'JD@gmail.com' }).fill(email);
        
        await page.locator('#contactPhone').fill('+123456478956');
        await page.getByPlaceholder('3').fill('2');
        // await page.getByRole('button', { name: 'Select roles' }).click();
        // await page.locator('div').filter({ hasText: /^Staff$/ }).click();

        const roles = ['Staff', 'Trainer'];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        console.log(`Randomly selected role: ${randomRole}`);
        await page.getByRole('button', { name: 'Select roles' }).click();
        await page.waitForSelector(`div:has-text("${randomRole}")`, { state: 'visible'});
        await page.locator('div', { hasText: new RegExp(`^${randomRole}$`, 'i') }).click();


        await page.locator('#password').fill('12345678');
        await page.locator('#confirmPassword').fill('12345678');

        await page.getByRole('button', { name: 'Add' }).click();
    });
});


test('Invalid Add Staff from admin', async ({ page }) => {
    await page.goto('/admin/staff');
    await page.waitForLoadState('domcontentloaded');
    
    await page.getByRole('button', { name: 'Add Staff' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    
    const modal = page.getByRole('dialog', { name: 'Add Staff' });
    await expect(modal.getByText('First Name is required')).toBeVisible();

});