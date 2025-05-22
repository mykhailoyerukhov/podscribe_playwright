import { test, expect } from '@playwright/test'
import { describe } from 'node:test'
import { title } from 'process'
import { DiscoverShowsPage } from '../pages/discover-shows.page'

test.describe('Tests for Podscribe', () => {

    let discoverShowsPage: DiscoverShowsPage;

    test.beforeEach(async ({ page}) => {
        discoverShowsPage = new DiscoverShowsPage(page);
    });

    test('Search for the first 25 titles and verifies it is showed in search results', async ({ page}) => {

        // Finding a button "Discover Shows" and clicking it
        await discoverShowsPage.goto()
        await discoverShowsPage.navigateToDiscoverShows()

        // Wait until page is ready
        await page.waitForLoadState('networkidle')

        await page.pause();
        // Gaining texts of all headings, putting it into a search bar and checking visibility
        await discoverShowsPage.checkEachTitleInSearchBar()
    });

    test('if any delta is greater than 80% - test fails', async ({page}) => {

        // Open page "Discover Shows"
        await discoverShowsPage.goto()
        await discoverShowsPage.navigateToDiscoverShows()

        // Checking, that all delta values are below 80% by module
        await discoverShowsPage.checkDelta()
        // If all values are in a normal range then print message
        console.log('All values are in the range of <= 80%');
    })
})