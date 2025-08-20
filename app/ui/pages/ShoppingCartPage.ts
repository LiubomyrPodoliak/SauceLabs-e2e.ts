import { Page } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";

export class ShoppingCartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getItemName() {
    return this.page.locator('[data-test="inventory-item-name"]').innerText();
  }

  async checkoutOrder() {
    await this.page.locator('[data-test="checkout"]').click();

    return new CheckoutPage(this.page);
  }
}
