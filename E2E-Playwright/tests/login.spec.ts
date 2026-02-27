import { test, expect } from '@playwright/test';
import { ReusableElements } from '../src/Pages/ReusableElememts'

/* Test Cases:
1. Verify if the login page is loading correctly.
2. Verify if the fields for username and password are present on the login page.
3. Verify if the login button is present and clickable.
4. Verify if the validation messages are displayed if username is blank
5. Verify if the validation messages are displayed if password is blank
*/

//create a test suite using describe block

test.describe('Login Page Tests', () => {
    let usernameField: any;
    let passwordField: any;
    let loginButton: any;

    //create the Page class object
    let reusableElements: ReusableElements;
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        
        //call page functions under beforeEach to initialize the page elements
        reusableElements = new ReusableElements(page);
        await reusableElements.verifyHeaderText();
        await reusableElements.verifyHomeLink();
        await reusableElements.verifyLoginLink();        

        //test if username field is present
        usernameField= page.locator('input[name="name"]');
        await expect(usernameField).toBeVisible();
        //test if password field is present
        passwordField = page.locator('input[name="password"]');
        await expect(passwordField).toBeVisible();
        //test if login button is present
        loginButton = page.locator('button[type="submit"]');
        await expect(loginButton).toBeVisible();

        await reusableElements.verifyFooterText();
    });


    test("Check for Username Validation", async ({ page }) => {  

    //test if validation message is displayed when username is blank
    await passwordField.fill('somepassword');
    await loginButton.click();
  
    const validationMessage = page.locator('text=Username is required');
    await expect(validationMessage).toBeVisible();        
    });

//test if validation message is displayed when password is blank

    test("Check for Password Validation", async ({ page }) => {
    
    //test if validation message is displayed when password is blank
    await usernameField.fill('abcde');
    await loginButton.click();
  
    const validationMessage = page.locator('text=Password is required');
    await expect(validationMessage).toBeVisible();        
    });


    test('Check If Username and password is valid', async ({ page }) => {    
    
    await usernameField.fill('merry123');
    await passwordField.fill('merry123');
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await loginButton.click();
  await page.goto('http://localhost:4200/customer-update?username=merry123');
});

});