import { obterProdutos } from "../API/api";
import * as localStorageUtil from '../util/localStorage';

describe('obterProdutos', () => {
    test('deve fazer uma requisição GET para obter os produtos', async () => {
      // Defina o valor esperado do token de autorização
      const token = 'TOKEN_DE_AUTORIZACAO';
  
      // Crie o mock para a função getItens
      jest.spyOn(localStorageUtil, 'getItens').mockReturnValue(token);
  
      // Mock manual para simular a função fetch
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([]),
      });
  
      // Faça a chamada da função que está sendo testada
      await obterProdutos();
  
      // Verifique se a função fetch foi chamada com os parâmetros corretos
      expect(fetch).toHaveBeenCalledWith(
        'https://burger-queen-api-mock-alpha.vercel.app/products',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      // Restaure a implementação original de getItens
      localStorageUtil.getItens.mockRestore();
    });
  });