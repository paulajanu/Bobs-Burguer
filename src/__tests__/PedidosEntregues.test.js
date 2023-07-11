import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PedidosEntregues from '../Componentes/PedidosEntregues/PedidosEntregues';
import { obterPedidos } from '../API/Orders.js';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../API/api', () => ({
  obterPedidos: jest.fn(),
}));

describe('PedidosEntregues', () => {
  let consoleErrorMock;

  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('exibe mensagem de sem pedidos quando não há pedidos entregues', async () => {
    obterPedidos.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue([]) });

    render(
    <BrowserRouter>
        <PedidosEntregues />
    </BrowserRouter>    
    );

    await waitFor(() => {
      expect(screen.getByText('Sem pedidos no momento!')).toBeInTheDocument();
    });
  });

  it('exibe os pedidos entregues corretamente', async () => {
    const pedidosMock = [
      {
        id: 1,
        client: 'Cliente 1',
        dateEntry: '2023-06-19',
        dateProcessed: '2023-06-19',
        status: 'Entregue',
        products: [
          { id: 1, quantity: 2, name: 'Produto 1' },
          { id: 2, quantity: 1, name: 'Produto 2' },
        ],
      },
      {
        id: 2,
        client: 'Cliente 2',
        dateEntry: '2023-06-20',
        dateProcessed: '2023-06-20',
        status: 'Entregue',
        products: [
          { id: 3, quantity: 1, name: 'Produto 3' },
          { id: 4, quantity: 3, name: 'Produto 4' },
        ],
      },
    ];

    obterPedidos.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue(pedidosMock) });

    render(
        <BrowserRouter>
            <PedidosEntregues />
        </BrowserRouter>    
        );

    await waitFor(() => {
      expect(screen.getByText('Cliente: Cliente 1')).toBeInTheDocument();
      expect(screen.getByText('Data de entrada: 2023-06-19')).toBeInTheDocument();
      expect(screen.getByText('Pedido Pronto: 2023-06-19')).toBeInTheDocument();
      expect(screen.getByText('2 - Produto 1')).toBeInTheDocument();
      expect(screen.getByText('1 - Produto 2')).toBeInTheDocument();

      expect(screen.getByText('Cliente: Cliente 2')).toBeInTheDocument();
      expect(screen.getByText('Data de entrada: 2023-06-20')).toBeInTheDocument();
      expect(screen.getByText('Pedido Pronto: 2023-06-20')).toBeInTheDocument();
      expect(screen.getByText('1 - Produto 3')).toBeInTheDocument();
      expect(screen.getByText('3 - Produto 4')).toBeInTheDocument();
    });
  });

  it('exibe mensagem de erro ao falhar ao obter os pedidos da API', async () => {
    obterPedidos.mockResolvedValueOnce({ ok: false });

    render(
        <BrowserRouter>
            <PedidosEntregues />
        </BrowserRouter>    
        );

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith('Erro ao obter os pedidos da API');
    });
  });

  it('exibe mensagem de erro com detalhes ao falhar ao obter os pedidos da API', async () => {
    const errorMock = new Error('Erro ao obter os pedidos da API');
    obterPedidos.mockRejectedValueOnce(errorMock);

    render(
        <BrowserRouter>
            <PedidosEntregues />
        </BrowserRouter>    
        );

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith('Erro ao obter os pedidos da API', errorMock);
    });
  });
});
