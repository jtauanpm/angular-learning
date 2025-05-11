import { Locator, Page } from '@playwright/test';

export abstract class AppBasePage {
  protected page: Page;
  public consoleMessages: string[] = [];

  constructor(page: Page) {
    this.page = page;

    this.page.on("console", (msg) => {
      if (msg.type() === "error") {
        this.consoleMessages.push(msg.text());
      }
    });
  }

  async navegarParaHome() {
    await this.navegarViaUrl("/");
  }

  async navegarViaUrl(url: string) {
    await this.page.goto(url);
  }

  async navegarPorLink(link: string) {
    await this.page.click(`text=${link}`);
  }

  obterElementoXpath(xpath: string): Locator {
    return this.page.locator(`xpath=${xpath}`);
  }

  async esperar(milisegundos: number) {
    await this.page.waitForTimeout(milisegundos);
  }
}