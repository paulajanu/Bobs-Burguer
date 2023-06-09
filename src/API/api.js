import { getItens } from "../util/localStorage.js";

const APIURL = 'https://burger-queen-api-mock-alpha.vercel.app';

export default function login(email, senha) {
    // console.log('Chamando a função login com email:', email, 'e senha:', senha);
  return fetch(`${APIURL}/login`, {
    // Tipo da requisicao
    method: "POST",
    //o headers indicar que estamos enviando dados no formato JSON
    //o content type serve para indicar o tipo de dado que estamos enviando.
    headers: {
      'Content-Type': 'application/json',
    },
    // Dados a serem enviados na requisicao
    body: JSON.stringify({
      email: email,
      password: senha
    })
  });
};

export const obterProdutos = () => {
    return fetch(`${APIURL}/products`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getItens()}`,
        },
    });
};

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
    console.log(error);
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
    // const dataProcessamento = formatarData(new Date());
    return await fetch(`${APIURL}/orders/${pedidoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getItens()}`
      }
    });
  } catch (error) {
    // Tratar o erro aqui
  }
};