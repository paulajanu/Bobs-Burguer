import { adicionarProdutos } from "../API/Products.js"
import * as localStorageUtil from '../util/localStorage';

describe('adicionarProdutos', () => {
  test('deve fazer uma requisição POST para adicionar um produto', async () => {
    // Mock da função fetch
    global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ ok: true }),
      });
      
      

    // Crie o mock para a função getItens
    jest.spyOn(localStorageUtil, 'getItens').mockReturnValue('TOKEN_DE_AUTORIZACAO');

    // Dados de teste
    const idProduto = 'ID_PRODUTO';
    const nomeProduto = 'Nome do Produto';
    const precoProduto = 9.99;
    const imgProduto = 'https://example.com/produto.png';
    const categoriaProduto = 'Categoria do Produto';
    const dataCadastro = '2023-06-20';

    // Faça a chamada da função que está sendo testada
    const result = await adicionarProdutos(
      idProduto,
      nomeProduto,
      precoProduto,
      imgProduto,
      categoriaProduto,
      dataCadastro
    );

    // Verificações
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://burger-queen-api-mock-alpha.vercel.app/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TOKEN_DE_AUTORIZACAO',
        },
        body: JSON.stringify({
          id: idProduto,
          name: nomeProduto,
          price: precoProduto,
          image: imgProduto,
          category: categoriaProduto,
          dateEntry: dataCadastro,
        }),
      }
    );

    // Verifica se o retorno possui a propriedade 'ok' como true
    expect(result).toEqual({ ok: true });

    // Restaura as implementações originais
    localStorageUtil.getItens.mockRestore();
  });
});