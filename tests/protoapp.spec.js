// App has radio buttons and drop downs
//static "select" drop downs
//website : https://rahulshettyacademy.com/loginpagePractise/
//this website uses separate username and password printed on the webpage itself.

// Test
const { test, expect} = require('@playwright/test');

test('Protoapp Playwright test', async ({ page}) => {

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
    await expect(page.locator("#myModal")).toBeHidden();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    //await page.pause();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //assetion - if something fails it pauses
    //await page.pause();   // pauses quick operation of browser ; playwright inspector opened. ; useful for debugging ;not necessary if assertion is used


})

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened

   const  text = await newPage.locator(".red").textContent();
   const arrayText = text.split("@")
   const domain =  arrayText[1].split(" ")[0]
   //console.log(domain);
   await page.locator("#username").fill(domain);
   console.log(await page.locator("#username").inputValue());
   
})
