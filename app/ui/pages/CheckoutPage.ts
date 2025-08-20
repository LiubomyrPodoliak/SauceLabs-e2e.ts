import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;
  private readonly checkoutPageHeader = '[data-test="title"]';

  constructor(page: Page) {
    this.page = page;
  }

  async isCheckoutPageOpened() {
    await expect(this.page.locator(this.checkoutPageHeader)).toBeVisible();
  }
}
