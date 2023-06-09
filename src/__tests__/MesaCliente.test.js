import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MesaCliente from "../Componentes/MesaCliente/MesaCliente.js";
import { ContextoCliente } from '../Contextos/contextoCliente.js';

// Mock do contexto
const mockContextoCliente = {
  cliente: 'Cliente Teste',
  addCliente: jest.fn(),
};

// Mock do parâmetro mesa
const mockMesa = 1;

test('renderiza corretamente o componente MesaCliente', () => {
  // Renderiza o componente com o contexto e a mesa mockados
  const { getByText, getByLabelText } = render(
    <ContextoCliente.Provider value={mockContextoCliente}>
      <MesaCliente mesa={mockMesa} />
    </ContextoCliente.Provider>
  );

  // Verifica se o número da mesa é exibido corretamente
  expect(getByText('Mesa: 1')).toBeInTheDocument();

  // Verifica se o rótulo "Cliente:" está presente
  expect(getByText('Cliente:')).toBeInTheDocument();

  // Verifica se o campo de entrada de texto está presente
  const inputCliente = getByLabelText('Cliente:');
  expect(inputCliente).toBeInTheDocument();
  expect(inputCliente.value).toBe('Cliente Teste');
});

test('chama corretamente a função addCliente ao alterar o nome do cliente', () => {
  // Renderiza o componente com o contexto e a mesa mockados
  const { getByLabelText } = render(
    <ContextoCliente.Provider value={mockContextoCliente}>
      <MesaCliente mesa={mockMesa} />
    </ContextoCliente.Provider>
  );

  // Obtém o campo de entrada de texto
  const inputCliente = getByLabelText('Cliente:');

  // Altera o valor do campo de entrada de texto
  fireEvent.change(inputCliente, { target: { value: 'Novo Cliente' } });

  // Verifica se a função addCliente foi chamada corretamente
  expect(mockContextoCliente.addCliente).toHaveBeenCalledWith('Novo Cliente');
});