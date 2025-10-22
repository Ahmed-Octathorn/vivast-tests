import { test, expect, APIRequestContext } from '@playwright/test';

const LOGIN_URL = '/login';
const MAILDEV_API = 'http://191.101.81.124:1080'; // MailDev API endpoint

// Utility: Fetch OTP from MailDev inbox
async function getOtpFromMailDev(
  request: APIRequestContext,
  to: string,
  subjectRegex: RegExp | null = /RED_STRENGTH_WEB_APP Login Code/i,
  otpRegex: RegExp = /Your verification code is (\d{4,8})/,
  timeoutMs = 20000,
  
  pollIntervalMs = 1000
): Promise<string> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const response = await request.get(`${MAILDEV_API}/email`);
    if (!response.ok()) {
      throw new Error(`MailDev API error: ${response.status()} ${response.statusText()}`);
    }

    const emails = await response.json() as any[];

    const matching = emails
      .filter(e => {
        const recipients = Array.isArray(e.to)
          ? e.to.map((r: any) => r.address || r)
          : [e.to];
        const toMatch = recipients.some((addr: string) => addr && addr.includes(to));
        const subjectMatch = subjectRegex ? subjectRegex.test(e.subject || '') : true;
        return toMatch && subjectMatch;
      })
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

    if (matching.length > 0) {
      const email = matching[0];
      const body = (email.text || email.html || '').toString();
      const otpMatch = body.match(otpRegex);
      if (otpMatch) {
        console.log('✅ Found OTP in email body:', otpMatch[1]);
        return otpMatch[1];
      } else {
        console.log('⚠️ OTP not found in email body. Body content:', body);
      }
    }

    await new Promise(res => setTimeout(res, pollIntervalMs));
  }

  throw new Error(`Timed out waiting for OTP email to ${to}`);
}

// Optional: clear MailDev inbox before each test
test.beforeEach(async ({ request }) => {
  await request.delete(`${MAILDEV_API}/email/all`).catch(() => {});
});

// ============ TESTS ============ //

test('Valid login with OTP from MailDev', async ({ page, request }) => {
  await page.goto(LOGIN_URL);

  await expect(page.getByRole('heading')).toContainText('Login');

  // Click Login to trigger OTP
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for OTP in MailDev
  const otp = await getOtpFromMailDev(
    request,
    'rs@admin.com',
    /RED_STRENGTH_WEB_APP Login Code/i, // subject
    /\b(\d{5})\b/ // match 5-digit OTP like 79141
  );

  console.log('Fetched OTP:', otp);

  // Fill OTP digits — assuming each digit is in its own textbox
  for (let i = 0; i < otp.length; i++) {
    await page.getByRole('textbox', { name: `Digit ${i + 1}` }).fill(otp[i]);
  }
  
  await page.getByRole('button', { name: 'Verify Code' }).click();
  
  await expect(page.locator('h1')).toContainText('Dashboard');

});

test( 'Invalid login shows error message', async ({ page }) => {
  await page.goto( LOGIN_URL)
  await expect(page.getByRole('heading')).toContainText('Login'); 
  await page.getByRole('textbox', { name: 'username@example.com' }).click();
  await page.locator('#password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('#root')).toContainText('Invalid credentials');
});