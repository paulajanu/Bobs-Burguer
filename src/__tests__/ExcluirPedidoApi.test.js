import { excluirPedido } from "../API/Orders.js";
import * as localStorageUtil from '../util/localStorage';

describe('excluirPedido', () => {
    test('deve fazer uma requisição DELETE para excluir o pedido', async () => {
      // Mock da função fetch
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
      });
  
      // Crie o mock para a função getItens
      jest.spyOn(localStorageUtil, 'getItens').mockReturnValue('TOKEN_DE_AUTORIZACAO');
  
      // Dados de teste
      const pedidoId = 'PEDIDO_ID';
  
      // Faça a chamada da função que está sendo testada
      const result = await excluirPedido(pedidoId);
  
      // Verificações
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://burger-queen-api-mock-alpha.vercel.app/orders/${pedidoId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer TOKEN_DE_AUTORIZACAO',
          },
        }
      );
  
      // Verifica se o retorno possui a propriedade 'ok' como true
      expect(result).toEqual({ ok: true });
  
      // Restaura as implementações originais
      localStorageUtil.getItens.mockRestore();
    });
  });