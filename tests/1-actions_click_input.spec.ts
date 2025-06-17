import { expect, test } from '@playwright/test';
import { LoginPage } from '../app/ui/pages/LoginPage';


// test('test text box', async ({ page }) => {
//     await page.goto('https://rozetka.com.ua/');

//     const searchInput = page.locator(`//input[@name='search']`);

//     await searchInput.click();

//     await searchInput.fill('samusng s25 Ultra');
//     await page.getByRole('button', { name: 'Знайти' }).click();
//     await page
//         .locator('//rz-button-product-page//a')
//         .nth(0)
//         // .filter({
//         //     hasText: 'Мобільний телефон Samsung Galaxy S25 Ultra 12/512GB Titanium Black (SM-'
//         // })
//         .click();

//     const h1 = page.locator(`//h1[contains(text(),'Samsung Galaxy S25')]`);


//     await expect(h1).toBeVisible();
// });


// test('test text box ineraction - facebook', async ({ page }) => {
//     const fbEmailTextBox = page.getByTestId('royal-email');
//     const fbPaasswordTextBox = page.getByTestId('royal-pass');

//     await page.goto("https://www.facebook.com/");


//     await expect(fbEmailTextBox).toHaveAttribute("placeholder", "Email or phone number");

//     await expect(fbPaasswordTextBox).toHaveAttribute("placeholder", "Password")


//     await fbEmailTextBox.type("test type", { delay: 70 });

//     await fbEmailTextBox.press("Control+A");
//     await fbEmailTextBox.press("Backspace");

//     const testFillText = "test fill";
//     await fbEmailTextBox.fill(testFillText);

//     await console.log("FB email text is: " + fbEmailTextBox.textContent())

//     await expect(fbEmailTextBox).toHaveValue(testFillText);

//     await page.getByTestId('royal-login-button').click();
// });

// test('test for clik in different elements', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');

//     await page.locator('[data-test="username"]').fill("standard_user");
//     await page.locator('[data-test="password"]').fill("secret_sauce");
//     await page.locator('[data-test="login-button"]').click();

//     const addToCartButton = (shopItemName: string) =>
//         page.locator(`//div[@class='inventory_item']//div[@data-test="inventory-item-name" and contains(text(),"${shopItemName}")]/ancestor::div[@class='inventory_item_description']//button`);

//     let sauceLabsBoltTShirt = "Sauce Labs Bolt T-Shirt";

//     await addToCartButton(sauceLabsBoltTShirt).click();

//     await page.locator('[data-test="shopping-cart-link"]').click();
//     await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(sauceLabsBoltTShirt);

//     await page.locator('[data-test="checkout"]').click();
// });

test('test with page object modal for clik in different elements', async ({ page }) => {
    const productListPage = await new LoginPage(page).loginToPortalWithDefaultCreds();
    const sauceLabsBoltTShirt = "Sauce Labs Bolt T-Shirt";

    await productListPage.addToCartButton(sauceLabsBoltTShirt)
    const shoppingCartPage = await productListPage.openShoppingCartPage();

    expect(await shoppingCartPage.getItemName()).toEqual(sauceLabsBoltTShirt);

    const checkoutPage = await shoppingCartPage.checkoutOrder();

    expect(await checkoutPage.isCheckoutPageOpened()).toBe(true);
});


