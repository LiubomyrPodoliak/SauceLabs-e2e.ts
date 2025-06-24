import { type Page, type Locator } from "@playwright/test";
import { ProductListPage } from "./ProductListPage";
import { getAuthData } from "../../../utils/creds.utils";
import { BasePage } from "./BasePage";
import { step } from "../../helpers/decorators/steps";

export class LoginPage extends BasePage{
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    @step("Opened Portal Login Page")
    async openPortalLoginPage() {
        await this.page.goto('/');

        return this;
    }

    async setUserName(userName: string) {
        await this.usernameInput.fill(userName);
    }

    async setPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async loginToPortal() {
        await this.loginButton.click();
    }

    async loginToPortalWithEmail(email: string) {
        const authData = getAuthData();

        await this.openPortalLoginPage();
        await this.setUserName(email);
        await this.setPassword(authData.password)
        await this.loginToPortal();

        return new ProductListPage(this.page);
    }

    async loginToPortalWithDefaultCreds() {
        const authData = getAuthData();

        await this.openPortalLoginPage();
        await this.setUserName(authData.email);
        await this.setPassword(authData.password)
        await this.loginToPortal();

        return new ProductListPage(this.page);
    }

}