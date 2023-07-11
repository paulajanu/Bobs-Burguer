import { obterPedidos } from '../API/Orders.js';
import * as localStorageUtil from '../util/localStorage';

describe('obterPedidos', () => {
  test('deve fazer uma requisição GET para obter os pedidos', async () => {
    // Mock da função fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    // Crie o mock para a função getItens
    jest.spyOn(localStorageUtil, 'getItens').mockReturnValue('TOKEN_DE_AUTORIZACAO');

    // Faça a chamada da função que está sendo testada
    await obterPedidos();

    // Verificações
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://burger-queen-api-mock-alpha.vercel.app/orders',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TOKEN_DE_AUTORIZACAO',
        },
      }
    );

    // Restaura a implementação original de getItens
    localStorageUtil.getItens.mockRestore();
  });
});
