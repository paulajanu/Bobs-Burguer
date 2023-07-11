import React from 'react';
import { render, screen} from '@testing-library/react';
import PedidosProntosCozinha from '../Componentes/PedidosProntos/PedidosProntosCozinha';
import { BrowserRouter } from 'react-router-dom';
import { obterPedidos } from '../API/Orders.js';


jest.mock('../API/api', () => ({
    obterPedidos: jest.fn(),
  }));
  
  describe('PedidosProntosCozinha', () => {
    let consoleErrorMock;
  
    beforeEach(() => {
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.clearAllMocks();
    });
  
    afterEach(() => {
      consoleErrorMock.mockRestore();
    });
  
    it('exibe a mensagem "Sem pedidos no momento!" quando não há pedidos', async () => {
      obterPedidos.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue([]) });
  
      render(
        <BrowserRouter>
            <PedidosProntosCozinha />
        </BrowserRouter>
        );
  
      expect(await screen.findByText('Sem pedidos no momento!')).toBeInTheDocument();
    });
  
    it('chama a função obterPedidos ao montar o componente', () => {
      obterPedidos.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue([]) });
  
      render(
        <BrowserRouter>
            <PedidosProntosCozinha />
        </BrowserRouter>
        );
  
      expect(obterPedidos).toHaveBeenCalled();
    });
  
    it('exibe a lista de pedidos corretamente', async () => {
      const pedidosMock = [
        {
          id: 1,
          client: 'Cliente 1',
          dateEntry: '2023-06-19',
          dateProcessed: '2023-06-19',
          status: 'Pronto',
          products: [
            { id: 1, quantity: 2, name: 'Produto 1' },
            { id: 2, quantity: 1, name: 'Produto 2' },
          ],
        },
      ];
  
      obterPedidos.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValue(pedidosMock) });
  
      render(
        <BrowserRouter>
            <PedidosProntosCozinha />
        </BrowserRouter>
        );

      await screen.findByText('Cliente: Cliente 1');
      expect(screen.getByText('Data de entrada: 2023-06-19')).toBeInTheDocument();
      expect(screen.getByText('Pedido Pronto: 2023-06-19')).toBeInTheDocument();
      expect(screen.getByText('2 - Produto 1')).toBeInTheDocument();
      expect(screen.getByText('1 - Produto 2')).toBeInTheDocument();
    });
  
    it('exibe mensagem de erro ao falhar ao obter os pedidos da API', async () => {
        obterPedidos.mockResolvedValueOnce({ ok: false });
    
        render(
        <BrowserRouter>
            <PedidosProntosCozinha />
        </BrowserRouter>
        );
    
        await new Promise((resolve) => setTimeout(resolve, 0)); // Aguarda a execução assíncrona
    
        expect(consoleErrorMock).toHaveBeenCalledWith('Erro ao obter os pedidos da API');
      });
    
      it('exibe mensagem de erro com detalhes ao falhar ao obter os pedidos da API', async () => {
        const errorMock = new Error('Erro ao obter os pedidos da API');
        obterPedidos.mockRejectedValueOnce(errorMock);
    
        render(
            <BrowserRouter>
                <PedidosProntosCozinha />
            </BrowserRouter>
            );
    
        await new Promise((resolve) => setTimeout(resolve, 0)); // Aguarda a execução assíncrona
    
        expect(consoleErrorMock).toHaveBeenCalledWith('Erro ao obter os pedidos da API', errorMock);
      });
  });