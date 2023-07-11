import login from "../API/Login.js";


describe('Teste da função login', () => {
  test('Deve fazer uma requisição POST para o endpoint de login', () => {
    // Dados de teste
    const email = 'exemplo@teste.com';
    const senha = '123456';

    // Mock da função fetch
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    // Chamada da função login
    login(email, senha);

    // Verificações
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://burger-queen-api-mock-alpha.vercel.app/login',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      })
    );
  });
});