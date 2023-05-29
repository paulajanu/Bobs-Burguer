import Botao from '../Botao/Botao';
import './CardPedido.css';
import {FaShoppingCart } from 'react-icons/fa';

const CardPedido = ({ produtosSelecionados }) => {
    // console.log('Produtos selecionados:', produtosSelecionados);
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
          {produtosSelecionados.map((produto) => (
            <div className="produto-selecionado">
              <span className="item-selecionado">{produto.name}</span>
              <span className="quantidade-selecionada">1</span>
              <span className="preco-selecionado">R$ {produto.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="container-total">
          <hr className="listra-total" />
          {/* Calcular e exibir o total */}
          <p className="total">
            Total: R$ {produtosSelecionados.reduce((total, produto) => total + produto.price, 0).toFixed(2)}
          </p>
        </div>
        <div className="botoes">
          <Botao className="transparente confirmar-cancelar">CANCELAR</Botao>
          <Botao className="azul confirmar-cancelar">CONFIRMAR</Botao>
        </div>
      </div>
    );
  };

  export default CardPedido;