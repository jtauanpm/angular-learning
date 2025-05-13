import test, { expect, Page } from "@playwright/test";
import { HomePage } from "./home.po";

test.describe("Testes da página inicial", () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) =>
        homePage = new HomePage(page)
    );

    test('Deve exibir mensagem inicial', async () => {
        await homePage.navegarParaHome();

        const title = await homePage.getTitleText()
        const expectedTitle = "Desenvolvimento SPA com Angular";

        expect(title).toBe(expectedTitle);        
    });

    test.afterEach(() => expect(homePage.consoleMessages).toEqual([]));
});
