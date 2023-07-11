import { enviarPedido } from "../API/Orders.js";
import * as localStorageUtil from '../util/localStorage';

describe('enviarPedido', () => {
    test('deve fazer uma requisição POST para enviar o pedido', async () => {
      // Dados de teste
      const idUsuario = 1;
      const cliente = 'João';
      const arrayProdutos = ['Hambúrguer', 'Batata Frita'];
      const dataEntrada = '2023-06-20';
  
      // Mock da função fetch
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      });
  
      // Crie o mock para a função getItens
      jest.spyOn(localStorageUtil, 'getItens').mockReturnValue('TOKEN_DE_AUTORIZACAO');
  
      // Faça a chamada da função que está sendo testada
      await enviarPedido(idUsuario, cliente, arrayProdutos, dataEntrada);
  
      // Verificações
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://burger-queen-api-mock-alpha.vercel.app/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer TOKEN_DE_AUTORIZACAO',
          },
          body: JSON.stringify({
            userId: idUsuario,
            client: cliente,
            products: arrayProdutos,
            status: 'Pendente',
            dateEntry: dataEntrada,
          }),
        }
      );
  
      // Restaura a implementação original de getItens
      localStorageUtil.getItens.mockRestore();
    });
  
    // test('deve lançar um erro se a resposta da requisição não for bem-sucedida', async () => {
    //   // Dados de teste
    //   const idUsuario = 1;
    //   const cliente = 'João';
    //   const arrayProdutos = ['Hambúrguer', 'Batata Frita'];
    //   const dataEntrada = '2023-06-20';
  
    //   // Mock da função fetch
    //   global.fetch = jest.fn().mockResolvedValue({
    //     ok: false,
    //   });
  
    //   // Crie o mock para a função getItens
    //   jest.spyOn(localStorageUtil, 'getItens').mockReturnValue('TOKEN_DE_AUTORIZACAO');
  
    //   // Faça a chamada da função que está sendo testada e verifique se ela lança um erro
    //   await expect(enviarPedido(idUsuario, cliente, arrayProdutos, dataEntrada)).rejects.toThrow(
    //     'Erro ao enviar o pedido'
    //   );
  
    //   // Restaura a implementação original de getItens
    //   localStorageUtil.getItens.mockRestore();
    // });
  });