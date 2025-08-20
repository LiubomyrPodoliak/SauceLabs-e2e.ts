import { test as base } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { ProductListPage } from "../pages/ProductListPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type MyFixtures = {
  userToLogin: string;

  productListPage: ProductListPage;
  checkoutPage: CheckoutPage;
  shoppingCartPage: ShoppingCartPage;
};

export const test = base.extend<MyFixtures>({
  userToLogin: undefined,

  page: async ({ page, userToLogin }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginToPortalWithEmail(userToLogin);

    await use(page);
  },

  productListPage: ({ page }, use) => {
    const productListPage = new ProductListPage(page);
    use(productListPage);
  },
  checkoutPage: ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    use(checkoutPage);
  },
  shoppingCartPage: ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    use(shoppingCartPage);
  },
});

export { expect } from "@playwright/test";
