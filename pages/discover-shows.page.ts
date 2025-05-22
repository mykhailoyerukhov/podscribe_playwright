import { Page } from "@playwright/test";

export class DiscoverShowsPage {
    private page: Page;
    private discoverShowsButton = '//a[@href="/series/top"]';
    private searchInput = '//input[@id="react-select-2-input"]';
    private titles = '//tbody/*//div/button/span[@data-test-id="Ellipsis"]';
    private percentElements = '//div[@data-test-id="Chip"]//*/span[contains(@class, "MuiTypography")]';
    private searchDropdown = '//form/div//*[contains(@class, "css-")]';

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/');
    }

    async navigateToDiscoverShows() {
        await this.page.locator(this.discoverShowsButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async getTitlesTextContent() {
        const titles = this.page.locator(this.titles);
        return await titles.allTextContents();
    }

    async checkEachTitleInSearchBar() {
        for (let eachTitle of await this.getTitlesTextContent()) {
            try {
                await this.page.locator(this.searchInput).focus();
                await this.page.locator(this.searchInput).fill('');
                await this.page.locator(this.searchInput).fill(eachTitle);
                await this.page.locator(this.searchInput).click({ delay: 100 });

                const searchDropdown = this.page.locator(this.searchDropdown);
                await searchDropdown.first().waitFor({ state: 'visible', timeout: 1000 });
            } catch (error) {
                console.log(`Error with title: "${eachTitle}"`);
                console.error(error);
            }
        }
    }
    async checkDelta() {
        const percentElements = await this.page.locator(this.percentElements).allTextContents();
        for (let eachPercent of percentElements) {
            const percentValue = parseFloat(eachPercent.replace('%', ''));
            if (percentValue > 80) {
                throw new Error(`Delta is greater than 80%: ${percentValue}%`);
            }
        }
    }

}