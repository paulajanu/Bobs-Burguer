import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { atualizarStatusPedido, obterPedidos } from '../API/api';
import PedidosEmPreparo from '../Componentes/PedidosEmPreparo/PedidosEmPreparo.js';

jest.mock('../API/api', () => ({
  atualizarStatusPedido: jest.fn(),
  obterPedidos: jest.fn(),
}));

describe('PedidosEmPreparo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('exibe "Sem pedidos no momento!" quando não há pedidos', async () => {
    obterPedidos.mockResolvedValueOnce({ ok: true, json: () => [] });

    render(
      <MemoryRouter>
        <PedidosEmPreparo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Sem pedidos no momento!')).toBeInTheDocument();
    });
  });

  test('exibe os pedidos corretamente', async () => {
    const pedidosMock = [
      {
        id: 1,
        client: 'Cliente 1',
        dateEntry: '2023-06-14',
        dateProcessed: '2023-06-14',
        status: 'Em preparo',
        products: [
          { id: 1, quantity: 1, name: 'Produto 1' },
          { id: 2, quantity: 2, name: 'Produto 2' },
        ],
      },
    ];

    obterPedidos.mockResolvedValueOnce({ ok: true, json: () => pedidosMock });

    render(
      <MemoryRouter>
        <PedidosEmPreparo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cliente: Cliente 1')).toBeInTheDocument();
      expect(screen.getByText('Data de entrada: 2023-06-14')).toBeInTheDocument();
      expect(screen.getByText('Inicio do Preparo: 2023-06-14')).toBeInTheDocument();
      expect(screen.getByText('Resumo do Pedido')).toBeInTheDocument();
      expect(screen.getByText('1 - Produto 1')).toBeInTheDocument();
      expect(screen.getByText('2 - Produto 2')).toBeInTheDocument();
    });
  });

  test('atualiza o status do pedido para "Pronto" quando o botão "PRONTO" é clicado', async () => {
    const pedidosMock = [
      {
        id: 1,
        client: 'Cliente 1',
        dateEntry: '2023-06-14',
        dateProcessed: '2023-06-14',
        status: 'Em preparo',
        products: [{ id: 1, quantity: 1, name: 'Produto 1' }],
      },
    ];

    obterPedidos.mockResolvedValueOnce({ ok: true, json: () => pedidosMock });
    atualizarStatusPedido.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <PedidosEmPreparo />
      </MemoryRouter>
    );

    await waitFor(() => {
      const btnPronto = screen.getByText('PRONTO');
      fireEvent.click(btnPronto);
    });

    expect(atualizarStatusPedido).toHaveBeenCalledWith(1, 'Pronto');
  });
});