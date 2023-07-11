import { getItens } from "../util/localStorage.js";

const APIURL = 'https://burger-queen-api-mock-alpha.vercel.app';

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