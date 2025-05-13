import test, { expect } from "@playwright/test";
import { CadastroPage } from "./cadastro.po";

test.describe('Testes do formulário de cadastro', () => {
    let cadastroPage: CadastroPage;

    test.beforeEach(async ({ page }) => cadastroPage = new CadastroPage(page));

    test('Deve navegar até formulário de cadastro', async () => {
        cadastroPage.iniciarNavegacao();
        expect(await cadastroPage.obterTituloCadastro()).toBe("Demo Cadastro Reactive Forms");
    });

    test('Deve preencher formulário de cadastro com sucesso', async () => {
        cadastroPage.iniciarNavegacao();

        var name = "John Lennon";
        var senha = "Teste@123";

        await cadastroPage.campoNome.fill(name);
        await cadastroPage.campoCPF.fill("30390600822");
        await cadastroPage.campoEmail.fill("teste@teste.com");
        await cadastroPage.campoSenha.fill(senha);
        await cadastroPage.campoSenhaConfirmacao.fill(senha);

        await cadastroPage.botaoRegistrar.click();
        await cadastroPage.esperar(1000);
        
        const result = await cadastroPage.obterResultadoCadastro();

        expect(result).toContain(`"nome":"${name}"`);
    });

    test("Deve validar senhas diferentes", async () => {
      cadastroPage.iniciarNavegacao();

      await cadastroPage.campoNome.fill("John Lennon");
      await cadastroPage.campoCPF.fill("30390600822");
      await cadastroPage.campoEmail.fill("teste@teste.com");
      await cadastroPage.campoSenha.fill("Teste@2123");
      await cadastroPage.campoSenhaConfirmacao.fill("Teste@123");

      await cadastroPage.campoSenha.click();

      expect(await cadastroPage.obterErroSenha()).toContain("As senhas não coincidem.");
    });
});