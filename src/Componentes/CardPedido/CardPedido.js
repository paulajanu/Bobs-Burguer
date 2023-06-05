import { useState, useContext } from 'react';
import Botao from '../Botao/Botao';
import './CardPedido.css';
import {FaShoppingCart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { enviarPedido } from '../../API/api';
import { ContextoCliente } from '../../Contextos/contextoCliente';
import { getIdUsuario } from '../../util/localStorage';



const CardPedido = ({ produtosSelecionados, removerProduto, tipoHamburguer, adicional }) => {
  const {cliente} = useContext(ContextoCliente);
  const [quantidadesSelecionadas, setQuantidadesSelecionadas] = useState({});

  const incrementarQuantidade = (produto) => {
    setQuantidadesSelecionadas((prevQuantidades) => ({
      ...prevQuantidades, // Copia as quantidades selecionadas existentes
      [produto.id]: (prevQuantidades[produto.id] || 0) + 1 || 1 // Incrementa a quantidade do produto selecionado
    }));
  };
    
  const decrementarQuantidade = (produto) => {
    setQuantidadesSelecionadas((prevQuantidades) => {
      const quantidadeAtual = prevQuantidades[produto.id] || 1; // Obtém a quantidade atual do produto ou define como 1 se não estiver definida
        if (quantidadeAtual === 1) {
          // Se a quantidade atual for 1, remove o produto da lista de quantidades selecionadas
          const novasQuantidades = { ...prevQuantidades };
          delete novasQuantidades[produto.id];
          return novasQuantidades; // Retorna a lista de quantidades atualizada sem o produto
        }
        return {
          ...prevQuantidades,
          [produto.id]: quantidadeAtual - 1 || 1 // Decrementa a quantidade do produto em 1, ou mantém como 1 se for menor que 1
        };
    });
  };

  const btnConfirmar = () => {
    // Mapeando os produtos selecionados e criando um novo array com as informações necessárias
    const arrayProdutos = produtosSelecionados.map((produto) => {
      // Verificando a quantidade selecionada do produto ou definindo como 1 caso não tenha sido selecionada
      const quantidadeSelecionada = quantidadesSelecionadas[produto.id] || 1;
      // Calculando o preço total do produto multiplicando o preço unitário pela quantidade selecionada
      const precoTotal = (produto.price * quantidadeSelecionada).toFixed(2);
  
      // Retornando um objeto com as informações do produto para o novo array
      return {
        id: produto.id,
        name: produto.name,
        quantity: quantidadeSelecionada,
        price: precoTotal
      };
    });
    
    const idUsuario = getIdUsuario(); 
    const dataEntrada = new Date().toLocaleString();

    // Chamando a função enviarPedido para enviar os dados para a API
    enviarPedido(idUsuario, cliente, arrayProdutos, dataEntrada)
      .then(() => {
      // Colocar o modal de confirmação
    })
    .catch((error) => {
    console.log(error);
  // Tratar o erro, se necessário
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
            <div className="produto-info">
              <span className="item-selecionado">
                {produto.name}
              </span>
                {produto.id === 5 && tipoHamburguer && (
              <div className="tipo-hamburguer-adicional">
                {tipoHamburguer}, {adicional}
              </div>
              )}
            </div>
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
        <Botao className="azul confirmar-cancelar" onClick={btnConfirmar}>CONFIRMAR</Botao>
      </div>
    </div>
  );
};

export default CardPedido;