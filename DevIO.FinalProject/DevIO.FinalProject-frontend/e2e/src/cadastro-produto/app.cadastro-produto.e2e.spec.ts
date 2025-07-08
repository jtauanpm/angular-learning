import { test, expect } from '@playwright/test';
import { AppProdutoPage } from './app.cadastro-produto.po';

test.describe('Testes do formulário de cadastro', () => {
  let produtoPage: AppProdutoPage;

  test.beforeEach(async ({ page }) => {
    produtoPage = new AppProdutoPage(page);
    await produtoPage.iniciarNavegacao();
  });

  test('deve navegar até produtos', async () => {
    const titulo = await produtoPage.obterTituloProdutos();
    expect(titulo?.trim()).toBe('Lista de Produtos');
  });

  test('deve preencher formulário de produtos com sucesso', async () => {
    await produtoPage.navegarParaNovoProduto();
    await produtoPage.selecionarFornecedor();

    await produtoPage.nome.fill('Produto Teste Automatizado');
    await produtoPage.descricao.fill('Produto \nTeste Automatizado');
    await produtoPage.valor.fill('1234,50');
    await produtoPage.selecionarImagem();
    await produtoPage.ativo.check();

    await produtoPage.botaoProduto.click();

    await produtoPage.esperar(6000);

    const titulo = await produtoPage.obterTituloProdutos();
    expect(titulo?.trim()).toBe('Lista de Produtos');
  });

  test.afterEach(() => expect(produtoPage.consoleMessages).toEqual([]));
});
