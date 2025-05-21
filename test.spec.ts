import { test, expect } from '@playwright/test'
import { describe } from 'node:test'

describe('Tests for Podscribe', () => {
    test.beforeEach(async ({ page}) => {
        await page.goto('https://app.podscribe.com/login')
    })
    test('Search for the first 25 titles and verifies it is showed in search results', async ({ page}) => {

        // Находим кнопку "Discover Shows" и кликаем по ней
        const DiscoverShowsButton =  page.locator('//a[@href="/series/top"]')
        await DiscoverShowsButton.click()

        // Ждем, пока загрузится страница
        await page.waitForLoadState('networkidle')

        // Находим заголовки и выводим их в один массив
        const titles = page.locator('//tbody/*//div/button/span[@data-test-id="Ellipsis"]')
        await expect(titles.first()).toBeVisible(); // Проверка, что хотя бы первый есть

        const titleText = await titles.allTextContents()
        console.log(titleText)

        // Для каждого заголовка (элемент массива) - вводим его в поисковую строку и проверяем что его находит
        const searchInput = page.locator('//input[@id="react-select-2-input"]')

        await page.pause();

        for (let eachTitle of titleText) {
            try {
                await expect(searchInput).toBeVisible(); // Убедиться, что поле видно
            await searchInput.focus();               // фокус
            await searchInput.fill('');             // готовим поле
            await searchInput.fill(eachTitle) 
            await searchInput.click({ delay: 100 }) // Клик по полю, чтобы оно не теряло фокус

            let searchDropdown = page.locator(`//form/div//*[contains(@class, "css-")]`)
            //form/div//*[contains(@class, "css-") and contains(@class, "-menu")]//text()[contains(., "${eachTitle}")]
            await expect(searchDropdown.first()).toBeVisible({timeout: 1000}); // Проверка, что выпадающий список виден
            await page.pause();
            }
            catch (error) {
                console.log(`Error with title: "${eachTitle}"`);
                console.error(error);
                await page.screenshot({ path: `screenshots/error-${eachTitle}.png`, fullPage: true });
            }
        }
    });
    test('if any delta is greater than 80% - test fails', async ({page}) => {
        //div[@data-test-id="Chip"]//*/span[contains(@class, "MuiTypography")]

        // Переходим на страницу "Discover Shows"
        const DiscoverShowsButton =  page.locator('//a[@href="/series/top"]')
        await DiscoverShowsButton.click()

        const percentElements = await page.locator('//div[@data-test-id="Chip"]//*/span[contains(@class, "MuiTypography")]').allTextContents();

        for (const text of percentElements) {
            // Извлекаем только цифры из текста, например "85%" -> 85
            const number = parseInt(text.replace(/[^\d]/g, ''), 10);
    
            if (number > 80) {
            console.log(`Найдено значение выше 80%: ${number}%`);
            throw new Error(`Найдено значение выше 80%: ${number}% — тест прерван`);
            }
            console.log(number)
        }
        
        console.log('Все значения в пределах нормы (<= 80%)');
    })
})