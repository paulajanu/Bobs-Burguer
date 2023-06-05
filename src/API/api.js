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
        status: "pending",
        dateEntry: dataEntrada,
      }),
    })
      .then(response => response.json()) // Converter a resposta em json
      .then(json => console.log(json))
      .catch(error => {
        console.log(error)
        throw error
      });
  };

  