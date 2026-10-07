const { test, expect } = require('@playwright/test');

test.only('Browser Context First Playwright test', async ({ browser}) =>
    {

    //playwright code 
    //step1 - open browser
    //step2 - enter username/password
    //step3 - login
    // In Java above steps are executed sequentially ; but in JavaScript all steps try to execute at a time in parallel ;
    // this is called asynchronous execution. Step 2 might start before Step 1 finishes. Step 3 might start before Step 2 finishes.
    //await is used to tell JS that step 1 must complete before moving to step 2.  Put async before the function keyword.
    //await works with async ; async "function" is anonymous( function has no name) ; used as () => {}
    // browser in function name is a fixture that helps in the code to launch and control the browser instance.
    // browser is not a string ; it must be wrapped in curly braces; then it is evaluated as a Playwright fixture
    //fixture is a term used for global variables available across your project

    // this section needs a context ( chrome browser with plugins and cookies etc )
   const context = await browser.newContext();
   const page = await context.newPage();
   //all 3 lines above is default ; use another fixture 'page'
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //css mostly used in Playwright, xpath not so much
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    //Playwright waits for element for 30 secs to show up without writing wait statement
    //get error message on screen due to wrong credentials given above ; now extract the error message
    //console.log(await page.locator("[style*='block']").textContent());
    //await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //To clear a textbox use this stmt
    //await page.locator("#username").fill("");
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());    // resolves to error about getting 4 products of same locator; for unique use nth(0)

});

test('Page Playwright test', async({page}) =>
{
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

//which brower to invoke etc is configured in playwright.config.js