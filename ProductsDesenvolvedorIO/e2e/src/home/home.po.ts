import { Page } from "@playwright/test";
import { AppBasePage } from "../app.base.po";

export class HomePage extends AppBasePage {
  constructor(page: Page) {
    super(page);
  }

  getTitleText() {
    return this.obterElementoXpath(
      "/html/body/app-root/app-home/header/div/div/div[2]/h1"
    ).textContent();
  }
}