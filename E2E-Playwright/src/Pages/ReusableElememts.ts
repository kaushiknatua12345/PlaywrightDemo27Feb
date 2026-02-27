import {Page, Locator, expect} from '@playwright/test';

export class ReusableElements {
    readonly page: Page;
    readonly headerText: Locator;
    readonly homeLink: Locator;
    readonly loginLink: Locator;
    readonly footerText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerText = page.locator('h1', { hasText: /Welcome/ });
        this.homeLink = page.locator('a', { hasText: 'Home' });
        this.loginLink = page.locator('a', { hasText: 'Login' });
        this.footerText = page.locator('footer', { hasText: /Copywright/ });
    }

    async verifyHeaderText() {
        await expect(this.headerText).toBeVisible();
        await expect(this.headerText).toHaveText(/Welcome/);
    }

    async verifyHomeLink() {
        await expect(this.homeLink).toBeVisible();
        await expect(this.homeLink).toHaveText('Home');
    }

    async verifyLoginLink() {
        await expect(this.loginLink).toBeVisible();
        await expect(this.loginLink).toHaveText('Login');
    }

    async verifyFooterText() {
        await expect(this.footerText).toBeVisible();
        await expect(this.footerText).toHaveText(/Copywright/);
    }
}