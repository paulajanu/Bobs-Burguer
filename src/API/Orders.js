import { getItens } from "../util/localStorage.js";

const APIURL = 'https://burger-queen-api-mock-alpha.vercel.app';

export const enviarPedido = (idUsuario, cliente, arrayProdutos, dataEntrada) => {

    return fetch(`${APIURL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getItens()}`,
      },
      body: JSON.stringify({
        userId: idUsuario,
        client: cliente,
        products: arrayProdutos,
        status: "Pendente",
        dateEntry: dataEntrada,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao enviar o pedido');
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
  };
  
export const obterPedidos = () => {
    return fetch(`${APIURL}/orders`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getItens()}`,
        },
    });
};
  
export const atualizarStatusPedido = async (pedidoId, novoStatus,) => {
    try {
      const dataAtualizada = new Date().toLocaleTimeString();
      const response = await fetch(`${APIURL}/orders/${pedidoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getItens()}`,
        },
        body: JSON.stringify({
          status: novoStatus,
          dateProcessed: dataAtualizada,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar o status do pedido');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
};
  
export const excluirPedido = async (pedidoId) => {
  
    try {
      return await fetch(`${APIURL}/orders/${pedidoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getItens()}`
        }
      });
    } catch (error) {
      throw error;
    }
};