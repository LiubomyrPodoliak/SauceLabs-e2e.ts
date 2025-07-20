import { test, expect } from '../app/ui/fixtures/authFixture';

test.use({ userToLogin: 'standard_user' });

test('test with page object modal for clik in different elements fixtures', async ({ 
    productListPage, 
    checkoutPage, 
    shoppingCartPage 
}) => {
    const sauceLabsBoltTShirt = "Sauce Labs Bolt T-Shirt";  

    await productListPage.addToCartButton(sauceLabsBoltTShirt)
    await productListPage.openShoppingCartPage();

    expect(await shoppingCartPage.getItemName()).toEqual(sauceLabsBoltTShirt);

    checkoutPage = await shoppingCartPage.checkoutOrder();

    expect(await checkoutPage.isCheckoutPageOpened()).toBe(true);
});
