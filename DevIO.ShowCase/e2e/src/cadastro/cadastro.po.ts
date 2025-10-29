import { Page } from "@playwright/test";
import { AppBasePage } from "../app.base.po";

export class CadastroPage extends AppBasePage {
  constructor(page: Page) {
    super(page);
  }

  navegarParaCadastro() {
    this.navegarViaUrl("/cadastro");
  }

  navegarParaCadastroPorLink() {
    this.navegarPorLink("Cadastro");
  }

  iniciarNavegacao() {
    this.navegarParaHome();
    this.navegarParaCadastroPorLink();
  }

  obterTituloCadastro() {
    return this.obterElementoXpath(
      "/html/body/app-root/app-cadastro/div/h4"
    ).textContent();
  }

  campoNome = this.obterElementoPorFormControl("nome");
  campoCPF = this.obterElementoPorFormControl("cpf");
  campoEmail = this.obterElementoPorFormControl("email");
  campoSenha = this.obterElementoPorFormControl("senha");
  campoSenhaConfirmacao = this.obterElementoPorFormControl("senhaConfirmacao");

  botaoRegistrar = this.page.locator("#registrar");

  async obterResultadoCadastro() {
    return await this.obterElementoXpath(
      "/html/body/app-root/app-cadastro/div/form/div/div[7]/div/p[4]"
    ).textContent();
  }

  async obterErroSenha() {
    return await this.obterElementoXpath(
      "/html/body/app-root/app-cadastro/div/form/div/div[5]/div/span/p"
    ).textContent();
  }
}