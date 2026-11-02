// 10/30/26
// This is webutils main test 

const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayLoad = {
   userEmail: process.env.TEST_USER_EMAIL,
   userPassword: process.env.TEST_USER_PASSWORD
};
const productName = process.env.TEST_PRODUCT_NAME;
const country = "India";
 
let response;
let apiContext;
test.beforeAll( async()=>
{
   if (!loginPayLoad.userEmail || !loginPayLoad.userPassword) {
      throw new Error('Set TEST_USER_EMAIL and TEST_USER_PASSWORD before running this test');
   }
   if (!productName) {
      throw new Error('Set TEST_PRODUCT_NAME to a product name available in the catalog');
   }

   apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayLoad);
   const token = await apiUtils.getToken();
   const productId = await apiUtils.getProductId(productName, token);
   response = await apiUtils.createOrder(
      {orders:[{country, productOrderedId: productId}]},
      token
   );
 
})

test.afterAll(async () => {
   await apiContext?.dispose();
});
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order 
