import { obterUsuarios } from "../API/Users.js";
import * as localStorageUtil from '../util/localStorage';

describe('obterUsuarios', () => {
  test('deve fazer uma requisição GET para obter os usuários', async () => {
    // Mock da função fetch
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([])
    });

    // Mock da função getItens
    jest.spyOn(localStorageUtil, 'getItens').mockReturnValue('TOKEN_DE_AUTORIZACAO');

    // Faça a chamada da função que está sendo testada
    const response = await obterUsuarios();

    // Verificações
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://burger-queen-api-mock-alpha.vercel.app/users',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer TOKEN_DE_AUTORIZACAO',
        },
      }
    );

    // Restaura as implementações originais
    localStorageUtil.getItens.mockRestore();
  });
});
