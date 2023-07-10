import './AguardandoProdução.css';
import Menu from '../Menu/Menu';
import { obterPedidos } from '../../API/api';
import { useEffect, useState } from 'react';
import Botao from '../Botao/Botao';
import { atualizarStatusPedido } from '../../API/api';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { excluirPedido } from '../../API/api';

const AguardandoProducao = () => {
  const [pedidos, setPedidos] = useState([]);
  const [modalParaProducaoIsOpen, setParaProducaoIsOpen] = useState(false);
  const [modalParaCancelarIsOpen, setParaCancelarIsOpen] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await obterPedidos();
  
        if (response.ok) {
          const data = await response.json();
          const pedidosPendentes = data.filter((pedido) => pedido.status === 'Pendente');
          setPedidos(pedidosPendentes);
        } else {
          console.error('Erro ao obter os pedidos da API');
        }
      } catch (error) {
        console.error('Erro ao obter os pedidos da API', error);
      }
    };
  
    fetchPedidos();
  }, []);
  

  const btnPrepararPedido = async (pedidoId) => {
    try {
      await atualizarStatusPedido(pedidoId, 'Em preparo');
      setPedidos((pedidosAnteriores) =>
        pedidosAnteriores.filter((pedido) => pedido.id !== pedidoId)
      );
      setParaProducaoIsOpen(true);
    } catch (error) {
      console.error('Erro ao preparar o pedido', error);
    }
  };

  const btnCancelarPedido = async (pedidoId) => {
    try {
      await excluirPedido(pedidoId);
      setPedidos((pedidosAnteriores) =>
        pedidosAnteriores.filter((pedido) => pedido.id !== pedidoId)
      );
      setParaCancelarIsOpen(true);
    } catch (error) {
      console.error('Erro ao cancelar o pedido', error);
    }
  };
  
  Modal.setAppElement('#root');

  return (
    <main className='menu-cozinha'>
      <div className="menu-cozinha-coluna">
        <Link to="/Cozinha" className="menu-link">
          <Menu imagem="/imagens/em-preparo.png" tamanhoImagem="imagem-pequena" estiloFonte="texto-menu-menor" texto="PENDENTES" />
        </Link>
        <Link to="/em-preparo" className="menu-link">
          <Menu imagem="/imagens/em-preparo2.png" tamanhoImagem="imagem-pequena" estiloFonte="texto-menu-menor" texto="EM PREPARO" />
        </Link>
        <Link to="/prontos" className="menu-link">
          <Menu imagem="/imagens/prontos.png"  tamanhoImagem="imagem-pequena" estiloFonte="texto-menu-menor" texto="PRONTOS" />
        </Link>
        </div>
      <div className='pedidos'>
        {pedidos.length === 0 ? (
          <div>
            <p className="pedidos-instrucao">Sem pedidos no momento!</p>
            <div className='div-img-sem-pedidos'>
              <img className='img-sem-pedidos' src="/imagens/sem-pedidos.png" alt="Imagem de sem pedidos" />
            </div>
          </div>
        ) : (
          pedidos.map((pedido) => (
            <div className="cards-pedidos" key={pedido.id}>
                <div className="informacoes">
                    <p className='pedido'>Cliente: {pedido.client}</p>
                    <p className='pedido'>Data de entrada: {pedido.dateEntry}</p>
                    <p className='titulo-pedido'>Resumo do Pedido</p>
                  {pedido.products.map((produto) => (
                    <div className="produto-card" key={produto.id}>
                      <p className='pedido'>{produto.quantity} - {produto.name}</p>
                    </div>
                  ))}
                </div>
              <div className='botoes-pedidos'>
                <Botao className="confirmar-cancelar verde" onClick={() => btnPrepararPedido(pedido.id)}>PREPARAR</Botao>
                <Botao className="confirmar-cancelar vermelho"  onClick={() => btnCancelarPedido(pedido.id)}>CANCELAR</Botao>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal
          className="modal-pedido-realizado"
          isOpen={modalParaProducaoIsOpen}
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
            <FaTimes className="icone-fechar-modal" onClick={() => setParaProducaoIsOpen(false)}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/pedido-em-producao.png" alt="Imagem de sem nome do cliente" />
            <p className='p-pedido-realizado'>Pedido enviado para preparo!</p>
          </div>
        </Modal>
        <Modal
          className="modal-pedido-realizado"
          isOpen={modalParaCancelarIsOpen}
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
            <FaTimes className="icone-fechar-modal" onClick={() => setParaCancelarIsOpen(false)}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/pedido-cancelado.png" alt="Imagem de sem nome do cliente" />
            <p className='p-pedido-realizado'>Pedido excluido com sucesso!</p>
          </div>
        </Modal>
    </main>
  );
};

export default AguardandoProducao;
