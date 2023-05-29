import React, { useEffect, useState } from 'react';
import Cards from '../Cards/Cards.js';
import { obterProdutos } from '../../API/api';
import './CardapioProdutos.css';
import CardPedido from '../CardPedido/CardPedido.js';
import MesaCliente from '../MesaCliente/MesaCliente.js';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const CardapioProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [mostrarProdutos, setMostrarProdutos] = useState(false); // Estado para controlar a visibilidade dos produtos
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const location = useLocation();
  const mesaParams = queryString.parse(location.search);
  const mesaSelecionada = mesaParams.mesa || '';

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await obterProdutos();
  
        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
        } else {
          console.error('Erro ao obter os produtos da API');
        }
      } catch (error) {
        console.error('Erro ao obter os produtos da API', error);
      }
    };
  
    fetchProdutos();
  }, []);
  
  const filtrarPorCategoria = (categoria) => {
    setCategoriaSelecionada(categoria);
    setMostrarProdutos(true); // Mostrar os produtos quando uma categoria for selecionada
  };

  const produtosFiltrados = categoriaSelecionada
    ? produtos.filter(produto => produto.category === categoriaSelecionada)
    : produtos;

    const adicionarProduto = (produto) => {
      console.log('Produto adicionado:', produto);
      setProdutosSelecionados([...produtosSelecionados, produto]);
    };
    

  return (
    <div className="container">
      <div className="content-left">
      <div className="cardapio-filtro">
        <button className="filtro-cardapio" onClick={() => filtrarPorCategoria('Café da manhã')}>Café da manhã</button>
        <button className="filtro-cardapio" onClick={() => filtrarPorCategoria('Hambúrgueres')}>Hambúrgueres</button>
        <button className="filtro-cardapio" onClick={() => filtrarPorCategoria('Acompanhamentos')}>Acompanhamentos</button>
        <button className="filtro-cardapio" onClick={() => filtrarPorCategoria('Bebidas')}>Bebidas</button>
      </div>
      <div className="cardapio-produtos">
      {mostrarProdutos &&  // Renderizar os produtos apenas se a variável mostrarProdutos for verdadeira
          produtosFiltrados.map((produto) => (
            <Cards
              key={produto.id}
              produto={produto} // Adicione a prop "produto" e passe o objeto "produto" como valor
              imagem={produto.image}
              cardsClassName="cards-produto"
              texto1={produto.name}
              texto2={`R$ ${produto.price.toFixed(2)}`}
              textoClassName="texto-card-produtos"
              adicionarProduto={adicionarProduto} // Remova a função de dentro do arrow function
            />
          ))}
        </div>
        </div>
        <div className="content-right">
          <MesaCliente mesa={mesaSelecionada} />
          <CardPedido produtosSelecionados={produtosSelecionados} />
        </div>
    </div>
  );
};

export default CardapioProdutos;