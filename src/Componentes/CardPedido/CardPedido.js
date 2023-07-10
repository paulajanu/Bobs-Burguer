import { useState, useContext } from 'react';
import Botao from '../Botao/Botao';
import './CardPedido.css';
import { FaShoppingCart, FaMinus, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import { enviarPedido } from '../../API/api';
import { ContextoCliente } from '../../Contextos/contextoCliente';
import { getIdUsuario } from '../../util/localStorage';
import Modal from 'react-modal';
import { useNavigate } from 'react-router';

const CardPedido = ({ produtosSelecionados, removerProduto, tipoHamburguer, adicional }) => {
  const {cliente} = useContext(ContextoCliente);
  const [quantidadesSelecionadas, setQuantidadesSelecionadas] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalNomeVazioIsOpen, setModalNomeVazioIsOpen] = useState(false);
  const [modalResumoVazioIsOpen, setModalResumoVazioIsOpen] = useState(false);
  const navigate = useNavigate();

  const incrementarQuantidade = (produto) => {
    setQuantidadesSelecionadas((prevQuantidades) => ({
      ...prevQuantidades, 
      [produto.id]: (prevQuantidades[produto.id] || 0) + 1 || 1 
    }));
  };

  const fecharModal = () => {
    setIsOpen(false);
    navigate('/Menugarcom');
  }
    
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

  const btnConfirmar = () => {
    if (cliente.trim() === '') {
      setModalNomeVazioIsOpen(true);
      return;
    }
    if (produtosSelecionados.length === 0) {
      setModalResumoVazioIsOpen(true);
      return;
    }
  
    const arrayProdutos = produtosSelecionados.map((produto) => {
      const quantidadeSelecionada = quantidadesSelecionadas[produto.id] || 1;
      const precoTotal = (produto.price * quantidadeSelecionada).toFixed(2);
  
      return {
        id: produto.id,
        name: produto.name,
        quantity: quantidadeSelecionada,
        price: precoTotal,
      };
    });
  
    const idUsuario = getIdUsuario();
    const dataEntrada = new Date().toLocaleString();
  
    enviarPedido(idUsuario, cliente, arrayProdutos, dataEntrada)
      .then(() => {
        setIsOpen(true); 
      })
      .catch((error) => {
        console.error('Erro ao realizar pedido', error);
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
        {}
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
        {}
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
        <Modal
          className="modal-pedido-realizado"
          isOpen={modalIsOpen}
          style={{
            overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            },
          }}
        >
          <div className="icone-modal">
            <FaTimes className="icone-fechar-modal" onClick={fecharModal}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/pedido-confirmado.png" alt="Imagem da confirmação do pedido" />
            <p className='p-pedido-realizado'>PEDIDO REALIZADO!</p>
          </div>
        </Modal>
        <Modal
          className="modal-pedido-realizado"
          isOpen={modalNomeVazioIsOpen}
          style={{
            overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            },
          }}
        >
          <div className="icone-modal">
            <FaTimes className="icone-fechar-modal" onClick={() => setModalNomeVazioIsOpen(false)}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/sem-nome.png" alt="Imagem de sem nome do cliente" />
            <p className='p-pedido-realizado'>Preencha o nome do cliente!</p>
          </div>
        </Modal>
        <Modal
          className="modal-pedido-realizado"
          isOpen={modalResumoVazioIsOpen}
          style={{
            overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            },
          }}
        >
          <div className="icone-modal">
            <FaTimes className="icone-fechar-modal" onClick={() => setModalResumoVazioIsOpen(false)}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/resumo-vazio.png" alt="Imagem de resumo do pedido vazio" />
            <p className='p-pedido-realizado'>Nenhum produto selecionado!</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CardPedido;