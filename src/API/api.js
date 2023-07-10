import { getItens } from "../util/localStorage.js";

const APIURL = 'https://burger-queen-api-mock-alpha.vercel.app';

export default function login(email, senha) {
  return fetch(`${APIURL}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
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

export const adicionarProdutos = async (
  idProduto,
  nomeProduto,
  precoProduto,
  imgProduto,
  categoriaProduto,
  dataCadastro
) => {
  try {
    const response = await fetch(`${APIURL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getItens()}`,
      },
      body: JSON.stringify({
        id: idProduto,
        name: nomeProduto,
        price: precoProduto,
        image: imgProduto,
        category: categoriaProduto,
        dateEntry: dataCadastro,
      }),
    });

    const products = await response.json();
    return products;
  } catch (error) {
    throw error;
  }
};

export const adicionarColaborador = async (nome, email, password, role) => {
  try {
  const response = await fetch(`${APIURL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nome,
      email: email,
      password: password,
      role: role,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('O token expirou, faça login novamente!');
    }
    throw new Error('Erro ao criar o usuário. Verifique se o e-mail já existe.');
  }

  const collaborator = await response.json();
  return collaborator;
} catch (error) {
  throw error;
}
};

export const editarProdutos = (produtoId, novosDados) => {
  return fetch(`${APIURL}/products/${produtoId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getItens()}`,
    },
    body: JSON.stringify(novosDados),
    
  })
};

export const deletarProdutos = (produtoId) => {
  return fetch(`${APIURL}/products/${produtoId}`, {
      
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getItens()}`,
      },
  })
};

export const editarColaboradores = (userId, novosDados) => {
  return fetch(`${APIURL}/users/${userId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getItens()}`,
    },
    body: JSON.stringify(novosDados),
    
  })
};

export const deletarColaboradores = (userId) => {
  return fetch(`${APIURL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${getItens()}`,
    },
  });
};

export const obterUsuarios = () => {
  return fetch(`${APIURL}/users`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getItens()}`,
      },
  });
};