const {test, expect} = require('@playwright/test');

test("trial google test", async ({page}) =>{
     
    await page.goto("http://www.google.com");
    console.log(await page.title());
    console.log("Test Done");
    await page.close;    
});

test.only("Rahul website test", async ({page}) => {

const userEmail = "" ;
const password = "" ;
await page.goto("https://rahulshettyacademy.com/client");
console.log(await page.title());
await page.locator("#userEmail").fill("anshika@gmail.com");
await page.locator("#userPassword").fill("Iamking@000");
await page.locator("[value = 'login']").click
console.log("Test Done");
await page.close;    


})