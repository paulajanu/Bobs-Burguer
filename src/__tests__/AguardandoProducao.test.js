import { render, screen, fireEvent } from '@testing-library/react';
import AguardandoProducao from '../Componentes/AguardandoProdução/AguardandoProdução';
import { obterPedidos, atualizarStatusPedido, excluirPedido } from '../API/api.js';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../API/api.js');

describe('AguardandoProducao', () => {
    let rootElement;
  
    beforeEach(() => {
      rootElement = document.createElement('div');
      rootElement.setAttribute('id', 'root');
      document.body.appendChild(rootElement);
    });
  
    afterEach(() => {
      document.body.removeChild(rootElement);
      rootElement = null;
    });
  
    it('renderiza os pedidos pendentes corretamente', async () => {
      const pedidosMock = [
        {
          id: 1,
          client: 'Cliente 1',
          dateEntry: '2023-06-14',
          status: 'Pendente',
          products: [
            { id: 1, quantity: 2, name: 'Produto 1' },
            { id: 2, quantity: 1, name: 'Produto 2' },
          ],
        },
        {
          id: 2,
          client: 'Cliente 2',
          dateEntry: '2023-06-15',
          status: 'Pendente',
          products: [
            { id: 3, quantity: 3, name: 'Produto 3' },
          ],
        },
      ];
  
      obterPedidos.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(pedidosMock) });
  
      render(
        <BrowserRouter>
            <AguardandoProducao />
        </BrowserRouter>
      );
  
      const cliente1Element = await screen.findByText('Cliente: Cliente 1');
      const cliente2Element = await screen.findByText('Cliente: Cliente 2');
  
      expect(cliente1Element).toBeInTheDocument();
      expect(cliente2Element).toBeInTheDocument();
    });
  
    it('atualiza o status do pedido para "Em preparo" ao clicar no botão PREPARAR', async () => {
      const pedidoId = 1;
      const pedidosMock = [
        {
          id: pedidoId,
          client: 'Cliente 1',
          dateEntry: '2023-06-14',
          status: 'Pendente',
          products: [
            { id: 1, quantity: 2, name: 'Produto 1' },
          ],
        },
      ];
  
      obterPedidos.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(pedidosMock) });
      atualizarStatusPedido.mockResolvedValueOnce();
  
      render(
        <BrowserRouter>
            <AguardandoProducao />
        </BrowserRouter>
      );
  
      const prepararPedidoButton = await screen.findByText('PREPARAR');
      prepararPedidoButton.click();
  
      expect(atualizarStatusPedido).toHaveBeenCalledWith(pedidoId, 'Em preparo');
    });
  
    it('exclui o pedido ao clicar no botão CANCELAR', async () => {
      const pedidoId = 2;
      const pedidosMock = [
        {
          id: pedidoId,
          client: 'Cliente 2',
          dateEntry: '2023-06-15',
          status: 'Pendente',
          products: [
            { id: 3, quantity: 3, name: 'Produto 3' },
          ],
        },
      ];
  
      obterPedidos.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(pedidosMock) });
      excluirPedido.mockResolvedValueOnce();
  
      render(
        <BrowserRouter>
            <AguardandoProducao />
        </BrowserRouter>
      );
  
      const cancelarPedidoButton = await screen.findByText('CANCELAR');
      cancelarPedidoButton.click();
  
      expect(excluirPedido).toHaveBeenCalledWith(pedidoId);
    });

// Teste para verificar se o modal de pedido para produção é aberto corretamente ao clicar no botão PREPARAR
it('abre o modal de pedido para produção ao clicar no botão PREPARAR', async () => {
    const pedidoId = 1;
    const pedidosMock = [
      {
        id: pedidoId,
        client: 'Cliente 1',
        dateEntry: '2023-06-14',
        status: 'Pendente',
        products: [
          { id: 1, quantity: 2, name: 'Produto 1' },
        ],
      },
    ];

    obterPedidos.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(pedidosMock) });
    atualizarStatusPedido.mockResolvedValueOnce();

    render(
        <BrowserRouter>
            <AguardandoProducao />
        </BrowserRouter>
      );

    const prepararPedidoButton = await screen.findByText('PREPARAR');
    fireEvent.click(prepararPedidoButton);

    const modalPedidoProducaoElement = await screen.findByText('Pedido enviado para preparo!');
    expect(modalPedidoProducaoElement).toBeInTheDocument();
  });

  // Teste para verificar se o modal de pedido cancelado é aberto corretamente ao clicar no botão CANCELAR
  it('abre o modal de pedido cancelado ao clicar no botão CANCELAR', async () => {
    const pedidoId = 2;
    const pedidosMock = [
      {
        id: pedidoId,
        client: 'Cliente 2',
        dateEntry: '2023-06-15',
        status: 'Pendente',
        products: [
          { id: 3, quantity: 3, name: 'Produto 3' },
        ],
      },
    ];

    obterPedidos.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(pedidosMock) });
    excluirPedido.mockResolvedValueOnce();

    render(
        <BrowserRouter>
            <AguardandoProducao />
        </BrowserRouter>
      );

    const cancelarPedidoButton = await screen.findByText('CANCELAR');
    fireEvent.click(cancelarPedidoButton);

    const modalPedidoCanceladoElement = await screen.findByText('Pedido excluido com sucesso!');
    expect(modalPedidoCanceladoElement).toBeInTheDocument();
  });

//   it('exibe mensagem de "Sem pedidos no momento" quando não há pedidos', async () => {
//     const pedidosMock = [];

//     obterPedidos.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(pedidosMock) });

//     render(
//         <BrowserRouter>
//             <AguardandoProducao />
//         </BrowserRouter>
//       );

//     const semPedidosMensagem = await screen.findByText('Sem pedidos no momento!');
//     expect(semPedidosMensagem).toBeInTheDocument();

//     const imgSemPedidos = screen.getByAltText('Imagem de sem pedidos');
//     expect(imgSemPedidos).toBeInTheDocument();
//   });

// it('exibe mensagem de erro ao falhar ao obter os pedidos', async () => {
//     obterPedidos.mockResolvedValueOnce({ ok: false });
  
//     render(
//         <BrowserRouter>
//             <AguardandoProducao />
//         </BrowserRouter>
//       );
  
//       const erroMensagens = screen.queryAllByText(/Erro ao obter os pedidos da API/);

//       expect(erroMensagens.length).toBeGreaterThan(0);
//   });
  });
