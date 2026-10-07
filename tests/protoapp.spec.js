// App has radio buttons and drop downs
//static "select" drop downs
//website : https://rahulshettyacademy.com/loginpagePractise/

// Test
const { test, expect} = require('@playwright/test');

test.only('Protoapp Playwright test', async ({ page}) => {

    //username = rahulshettyacademy ;
    //password = Learning@830$3mK2
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //const userName = page.locator("#username");
    //const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    //assetion - if something fails it pauses
    await page.pause();   // pauses quick operation of browser ; playwright inspector opened. ; useful for debugging


})