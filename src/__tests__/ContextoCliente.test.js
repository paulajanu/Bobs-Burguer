import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContextoCliente, ProvedorCliente } from '../Contextos/contextoCliente.js';

describe('ProvedorCliente', () => {
  it('deve fornecer o contexto do cliente e a função addCliente', () => {
    const { getByText, queryAllByTestId } = render(
      <ProvedorCliente>
        <ContextoCliente.Consumer>
          {(context) => (
            <>
              <div data-testid="cliente">{context.cliente}</div>
              <button onClick={() => context.addCliente('Novo Cliente')}>
                Adicionar Cliente
              </button>
            </>
          )}
        </ContextoCliente.Consumer>
      </ProvedorCliente>
    );

    expect(queryAllByTestId('cliente')).toHaveLength(1); // Verifica se há exatamente um elemento com o atributo data-testid="cliente"

    fireEvent.click(getByText('Adicionar Cliente'));

    expect(queryAllByTestId('cliente')).toHaveLength(1); // Verifica se há exatamente um elemento com o atributo data-testid="cliente"
    expect(queryAllByTestId('cliente')[0].textContent).toBe('Novo Cliente'); // Verifica se o texto do elemento é "Novo Cliente"
  });
});