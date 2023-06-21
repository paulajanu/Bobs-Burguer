import { adicionarColaborador } from "../API/api";

describe('adicionarColaborador', () => {
    test('deve fazer uma requisição POST para adicionar um colaborador', async () => {
      // Mock da função fetch
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          id: 1,
          name: 'Nome do Colaborador',
          email: 'colaborador@example.com',
          role: 'admin',
          dataCadastro: '2023-06-20'
        })
      });
  
      // Dados de teste
      const nome = 'Nome do Colaborador';
      const email = 'colaborador@example.com';
      const password = 'senha123';
      const role = 'admin';
  
      // Faça a chamada da função que está sendo testada
      const result = await adicionarColaborador(nome, email, password, role);
  
      // Verificações
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://burger-queen-api-mock-alpha.vercel.app/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nome,
            email: email,
            password: password,
            role: role,
          }),
        }
      );
  
      // Verifica se o retorno possui a propriedade 'ok' como true
      expect(result).toEqual({
        id: 1,
        name: 'Nome do Colaborador',
        email: 'colaborador@example.com',
        role: 'admin',
        dataCadastro: '2023-06-20'
      });
    });
  });
  