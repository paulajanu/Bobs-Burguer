import { atualizarStatusPedido } from "../API/api";
import * as localStorageUtil from '../util/localStorage';

describe('atualizarStatusPedido', () => {
  test('deve fazer uma requisição PATCH para atualizar o status do pedido', async () => {
    // Mock da função fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    // Crie o mock para a função getItens
    jest.spyOn(localStorageUtil, 'getItens').mockReturnValue('TOKEN_DE_AUTORIZACAO');

    // Defina o valor atual da data para o mock
    const dataAtual = new Date().toLocaleTimeString();
    jest.spyOn(global, 'Date').mockImplementation(() => ({
      toLocaleTimeString: jest.fn().mockReturnValue(dataAtual),
    }));

    // Dados de teste
    const pedidoId = 'PEDIDO_ID';
    const novoStatus = 'NOVO_STATUS';

    // Faça a chamada da função que está sendo testada
    const result = await atualizarStatusPedido(pedidoId, novoStatus);

    // Verificações
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://burger-queen-api-mock-alpha.vercel.app/orders/${pedidoId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TOKEN_DE_AUTORIZACAO',
        },
        body: JSON.stringify({
          status: novoStatus,
          dateProcessed: dataAtual,
        }),
      }
    );
    expect(result).toEqual({});

    // Restaura as implementações originais
    localStorageUtil.getItens.mockRestore();
    global.Date.mockRestore();
  });
});