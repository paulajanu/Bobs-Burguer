import { useState } from 'react';
import Botao from '../Botao/Botao';
import './CardPedido.css';
import {FaShoppingCart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

const CardPedido = ({ produtosSelecionados, removerProduto }) => {
    // console.log('Produtos selecionados:', produtosSelecionados);
    const [quantidadesSelecionadas, setQuantidadesSelecionadas] = useState({});

    const incrementarQuantidade = (produto) => {
      setQuantidadesSelecionadas((prevQuantidades) => ({
        ...prevQuantidades,
        [produto.id]: (prevQuantidades[produto.id] || 0) + 1 || 1
      }));
    };
    
    const decrementarQuantidade = (produto) => {
      setQuantidadesSelecionadas((prevQuantidades) => {
        const quantidadeAtual = prevQuantidades[produto.id] || 1;
        if (quantidadeAtual === 1) {
          const novasQuantidades = { ...prevQuantidades };
          delete novasQuantidades[produto.id];
          return novasQuantidades;
        }
        return {
          ...prevQuantidades,
          [produto.id]: quantidadeAtual - 1 || 1
        };
      });
    };
    
    return (
      <div className="card-pedido">
        <p className="resumo-compra">
          <span className="span-carrinho">
            <FaShoppingCart className="icone-carrinho" />
          </span>
          Resumo da Compra
        </p>
        <div className="inicio-carrinho">
          <p className="itens-qtd-preco">
            <span className="item">Item</span>
            <span className="quantidade">Qtd</span>
            <span className="preco">Preço</span>
          </p>
          <hr className="listra-carrinho" />
          {/* Exibir os produtos selecionados */}
          {produtosSelecionados.map((produto, index) => (
            <div className="produto-selecionado" key={index}>
              <span className="item-selecionado">{produto.name}</span>
              <FaMinus className="icone-minus" onClick={() => decrementarQuantidade(produto)} />
              <span className="quantidade-selecionada">{quantidadesSelecionadas[produto.id] || 1}</span>
              <FaPlus className="icone-plus" onClick={() => incrementarQuantidade(produto)} />
              <span className="preco-selecionado">
                R$ {(produto.price * (quantidadesSelecionadas[produto.id] || 1)).toFixed(2)}
              </span>
                <FaTrash className="icone-lixeira" onClick={() => removerProduto(produto)} />
            </div>
          ))}
        </div>
        <hr className="listra-total" />
        <div className="container-total">
          {/* Calcular e exibir o total */}
          <p className="total">
            Total: 
          </p>
          <p className="total">
            R$ {produtosSelecionados.reduce((total, produto) => {
              const quantidade = quantidadesSelecionadas[produto.id] || 1;
              return total + produto.price * quantidade;
            }, 0).toFixed(2)}
          </p>
        </div>
        <div className="botoes">
          <Botao className="azul confirmar-cancelar">CONFIRMAR</Botao>
        </div>
      </div>
    );
  };

  export default CardPedido;