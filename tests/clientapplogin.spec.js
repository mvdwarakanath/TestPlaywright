// Test
const { test, expect} = require('@playwright/test');

test.only('Clientapp Login  Playwright test', async ({ page}) => {

    const email = "???@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());

    // USE ENVIRONMENT Variables for CREDENTIALS
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    const titles = await page.locator(".card-body").allTextContents();
    console.log("Products T2 are : ",titles);
    console.log("Test Done");

});

