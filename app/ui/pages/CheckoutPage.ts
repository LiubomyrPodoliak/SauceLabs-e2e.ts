import { Page } from "@playwright/test";

export class CheckoutPage{
    private readonly page: Page;
    private readonly checkoutPageHeader = '[data-test="title"]';

    constructor(page: Page){
        this.page = page;
    }

    async isCheckoutPageOpened(){
        return await this.page.locator(this.checkoutPageHeader).isVisible();
    }
}