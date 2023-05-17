import { Erros } from "../Erros/erros";

describe('Erros', () => {
  test('Retorna mensagem de erro correta para senha incorreta', () => {
    const mensagem = 'Incorrect password';
    const resultado = Erros(mensagem);
    expect(resultado).toBe('Senha incorreta!');
  });

  test('Retorna mensagem de erro correta para usuário não encontrado', () => {
    const mensagem = 'Cannot find user';
    const resultado = Erros(mensagem);
    expect(resultado).toBe('Usuário não encontrado!');
  });

  test('Retorna mensagem de erro correta para campos vazios', () => {
    const mensagem = 'Email and password are required';
    const resultado = Erros(mensagem);
    expect(resultado).toBe('Por favor, preencha todos os campos!');
  });

  test('Retorna mensagem de erro padrão para mensagem desconhecida', () => {
    const mensagem = 'Mensagem desconhecida';
    const resultado = Erros(mensagem);
    expect(resultado).toBe('Ops, ocorreu algum erro!');
  });
});