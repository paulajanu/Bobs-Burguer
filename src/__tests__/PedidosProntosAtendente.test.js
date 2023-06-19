import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PedidosProntosAtendentes from '../Componentes/PedidosProntos/PedidosProntosAtendente.js';
import { obterPedidos, atualizarStatusPedido } from '../API/api';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../API/api', () => ({
  obterPedidos: jest.fn(),
  atualizarStatusPedido: jest.fn(),
}));

describe('PedidosProntosAtendentes', () => {
    let consoleErrorMock;

    beforeEach(() => {
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.clearAllMocks();
      const root = document.createElement('div');
      root.id = 'root';
      document.body.appendChild(root);
    });

    afterEach(() => {
        consoleErrorMock.mockRestore();
    });
  
    it('exibe mensagem de "Sem pedidos no momento!" quando não há pedidos', async () => {
      obterPedidos.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue([]) });
  
      render(
        <BrowserRouter>
          <PedidosProntosAtendentes />
        </BrowserRouter>
      );
  
      expect(await screen.findByText('Sem pedidos no momento!')).toBeInTheDocument();
    });

    it('chama a função obterPedidos ao montar o componente', () => {
        obterPedidos.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue([]) });
      
        render(
          <BrowserRouter>
            <PedidosProntosAtendentes />
          </BrowserRouter>
        );
      
        expect(obterPedidos).toHaveBeenCalled();
      });
    
      it('exibe a lista de pedidos corretamente', async () => {
        const pedidosMock = [
          {
            id: 1,
            client: 'Cliente 1',
            dateEntry: '2023-06-14',
            dateProcessed: '2023-06-14',
            status: 'Pronto',
            products: [
              { id: 1, quantity: 1, name: 'Produto 1' },
              { id: 2, quantity: 2, name: 'Produto 2' },
            ],
          },
        ];
      
        obterPedidos.mockResolvedValueOnce({ ok: true, json: () => pedidosMock });
      
        render(
          <BrowserRouter>
            <PedidosProntosAtendentes />
          </BrowserRouter>
        );
      
        await screen.findByText('Cliente: Cliente 1');
        expect(screen.getByText('Data de entrada: 2023-06-14')).toBeInTheDocument();
        expect(screen.getByText('Pedido Pronto: 2023-06-14')).toBeInTheDocument();
        expect(screen.getByText('1 - Produto 1')).toBeInTheDocument();
        expect(screen.getByText('2 - Produto 2')).toBeInTheDocument();
      });
      
      it('chama a função btnEntregarPedido ao clicar no botão "ENTREGAR" e remove o pedido da lista', async () => {
        const pedidoId = 1;
        const pedidosMock = [
          {
            id: pedidoId,
            client: 'Cliente 1',
            dateEntry: '2023-06-14',
            dateProcessed: '2023-06-14',
            status: 'Pronto',
            products: [{ id: 1, quantity: 1, name: 'Produto 1' }],
          },
          // Adicione mais exemplos de pedidos conforme necessário
        ];
      
        obterPedidos.mockResolvedValueOnce({ ok: true, json: () => pedidosMock });
      
        render(
          <BrowserRouter>
            <PedidosProntosAtendentes />
          </BrowserRouter>
        );
      
        await screen.findByText('Cliente: Cliente 1');
      
        const btnEntregar = screen.getByText('ENTREGAR');
        fireEvent.click(btnEntregar);
      
        await waitFor(() => {
          expect(atualizarStatusPedido).toHaveBeenCalledWith(pedidoId, 'Entregue');
          expect(screen.queryByText('Cliente: Cliente 1')).not.toBeInTheDocument();
        });
      });

      it('exibe mensagem de erro ao obter os pedidos da API', async () => {
        obterPedidos.mockResolvedValueOnce({ ok: false });
      
        render(
          <BrowserRouter>
            <PedidosProntosAtendentes />
          </BrowserRouter>
        );
      
        await waitFor(() => {
          expect(consoleErrorMock).toHaveBeenCalledWith('Erro ao obter os pedidos da API');
        });
      });
});