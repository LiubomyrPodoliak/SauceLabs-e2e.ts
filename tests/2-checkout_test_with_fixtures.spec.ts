import { test, expect } from "../app/ui/fixtures/authFixture";
import { Page } from "@playwright/test";

test.use({ userToLogin: "standard_user" });

test("test with page object modal for click in different elements fixtures", async ({
  productListPage,
  checkoutPage,
  shoppingCartPage,
}) => {
  const sauceLabsBoltTShirt = "Sauce Labs Bolt T-Shirt";

  await productListPage.addToCartButton(sauceLabsBoltTShirt);
  await productListPage.openShoppingCartPage();

  expect(await shoppingCartPage.getItemName()).toEqual(sauceLabsBoltTShirt);

  checkoutPage = await shoppingCartPage.checkoutOrder();

  checkoutPage.isCheckoutPageOpened();
});

test("collect all items on the page", async ({
  productListPage,
  shoppingCartPage,
  page,
}) => {
  const items = await productListPage.getAllItems();
  expect(items.length).toBeGreaterThan(0);

  let randomItemName = items[Math.floor(Math.random() * items.length)].name;

  await productListPage.addToCartButton(randomItemName);
  await productListPage.openShoppingCartPage();

  expect(await shoppingCartPage.getItemName()).toEqual(randomItemName);
});
