import { getItens } from "../util/localStorage.js";

const APIURL = 'https://burger-queen-api-mock-alpha.vercel.app';

export const obterProdutos = () => {
    return fetch(`${APIURL}/products`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getItens()}`,
      },
    });
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