import { type Page, type Locator } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage";
import { step } from "../../helpers/decorators/steps";
import { ProductItem, ProductItemBuilder } from "../modals/ProductItem";

export class ProductListPage {
  private readonly page: Page;
  private readonly addToCartButtonLocator = (shopItemName: string) =>
    this.page.locator(
      `//div[@class='inventory_item']//div[@data-test="inventory-item-name" and contains(text(),"${shopItemName}")]/ancestor::div[@class='inventory_item_description']//button`
    );

  private readonly shoppingCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
  }

  @step("Added t short: {tShortName}")
  async addToCartButton(tShortName: string) {
    await this.addToCartButtonLocator(tShortName).click();

    return this;
  }

  @step("Get all items on the page")
  async openShoppingCartPage() {
    await this.shoppingCartButton.click();

    return new ShoppingCartPage(this.page);
  }

  @step("Get all items on the page")
  async getAllItems(): Promise<ProductItem[]> {
    const containers = this.page.locator(".inventory_item");
    const count = await containers.count();
    const items: ProductItem[] = [];

    for (let i = 0; i < count; i++) {
      const container = containers.nth(i);

      const name = (
        await container.locator(".inventory_item_name").innerText()
      ).trim();
      const description = (
        await container.locator(".inventory_item_desc").innerText()
      ).trim();
      const priceText = (
        await container.locator(".inventory_item_price").innerText()
      ).trim();

      // Use the builder which accepts string prices and parses them
      const product = new ProductItemBuilder()
        .setName(name)
        .setDescription(description)
        .setPrice(priceText)
        .build();

      items.push(product);
    }

    return items;
  }
}
