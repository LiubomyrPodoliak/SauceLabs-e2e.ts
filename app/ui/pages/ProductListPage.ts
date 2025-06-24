import { type Page, type Locator } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage"
import { step } from "../../helpers/decorators/steps";

export class ProductListPage {
    private readonly page: Page;
    private readonly addToCartButtonLocator = (shopItemName: string) =>
        this.page.locator(`//div[@class='inventory_item']//div[@data-test="inventory-item-name" and contains(text(),"${shopItemName}")]/ancestor::div[@class='inventory_item_description']//button`);

    private readonly shoppingCartButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
    }

    @step("Added t short: {tShortName}")
    async addToCartButton(tShortName) {
        await this.addToCartButtonLocator(tShortName).click();

        return this;
    }

    async openShoppingCartPage() {
        await this.shoppingCartButton.click();

        return new ShoppingCartPage(this.page)
    }




}