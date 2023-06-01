import React from 'react';
import Formulario from '../Componentes/Formulario/Formulario.js';
import { waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import login from '../API/api.js';
import { Erros } from '../Erros/erros.js';

jest.mock('../API/api.js');

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../Erros/erros.js', () => ({
  Erros: jest.fn(),
}));

describe('Formulario', () => {
  test('Realiza o login e navega para a página de destino', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  
    const { getByLabelText, getByText } = render(<Formulario />);
  
    const emailInput = getByLabelText('E-mail:');
    const senhaInput = getByLabelText('Senha:');
    const entrarButton = getByText('ENTRAR');
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(senhaInput, { target: { value: 'password' } });
  
    login.mockResolvedValueOnce({ status: 200 });
  
    fireEvent.click(entrarButton);
  
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'password');
      expect(navigate).toHaveBeenCalledWith('/Menugarcom');
    });
  });

  it('deve exibir uma mensagem de erro ao ocorrer uma falha no login', async () => {
    Erros.mockReturnValueOnce('Credenciais inválidas');
    login.mockRejectedValueOnce('Erro de login');

    const { getByLabelText, getByText, getByTestId } = render(<Formulario />);

    const emailInput = getByLabelText('E-mail:');
    const senhaInput = getByLabelText('Senha:');
    const entrarButton = getByText('ENTRAR');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(senhaInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(entrarButton);

    await waitFor(() => {
      expect(Erros).toHaveBeenCalledTimes(1);
      expect(Erros).toHaveBeenCalledWith('Erro de login');
      expect(getByTestId('mensagem-erro')).toHaveTextContent('Credenciais inválidas');
    });
  });

  it('deve chamar a função Erros ao ocorrer uma resposta com status 400', async () => {
    const errorMessage = 'Erro de requisição inválida';
    Erros.mockReturnValueOnce('Mensagem de erro customizada');
    login.mockResolvedValueOnce({ status: 400, json: () => Promise.resolve(errorMessage) });
  
    const { getByLabelText, getByText, getByTestId } = render(<Formulario />);
  
    const emailInput = getByLabelText('E-mail:');
    const senhaInput = getByLabelText('Senha:');
    const entrarButton = getByText('ENTRAR');
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(senhaInput, { target: { value: 'validpassword' } });
    fireEvent.click(entrarButton);
  
    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toHaveBeenCalledWith('test@example.com', 'validpassword');
      expect(Erros).toHaveBeenCalledTimes(1);
      expect(Erros).toHaveBeenCalledWith(errorMessage);
      expect(getByTestId('mensagem-erro')).toHaveTextContent('Mensagem de erro customizada');
    });
  });
});
  
  
  