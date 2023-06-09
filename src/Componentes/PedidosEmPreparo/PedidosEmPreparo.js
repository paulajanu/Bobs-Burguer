import { Link } from 'react-router-dom';
import { atualizarStatusPedido, obterPedidos } from '../../API/api';
import { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import Botao from '../Botao/Botao';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

const PedidosEmPreparo = () => {
  const [pedidos, setPedidos] = useState([]);
  const [modalPedidoProntoIsOpen, setPedidoProntoIsOpen] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await obterPedidos();

        if (response.ok) {
          const data = await response.json();
          // Filtra os pedidos com o status "Em Preparo"
          const pedidosEmPreparo = data.filter((pedido) => pedido.status === 'Em preparo');
          setPedidos(pedidosEmPreparo);
        } else {
          console.error('Erro ao obter os pedidos da API');
        }
      } catch (error) {
        console.error('Erro ao obter os pedidos da API', error);
      }
    };

    fetchPedidos();
  }, []);

  const btnPedidoPronto = async (pedidoId) => {
    console.log('pedidoID', pedidoId);
    try {
      // Chama a função atualizarStatusPedido para atualizar o status do pedido para 'Pronto'
      await atualizarStatusPedido(pedidoId, 'Pronto');
      // Remove o pedido da lista de pedidos
      setPedidos((pedidosAnteriores) =>
        pedidosAnteriores.filter((pedido) => pedido.id !== pedidoId)
      );
      setPedidoProntoIsOpen(true);
    } catch (error) {
      console.error('Erro ao preparar o pedido', error);
    }
  };

  return (
    <main className='menu-cozinha'>
      <div className="menu-cozinha-coluna">
        <Link to="/Cozinha" className="menu-link">
          <Menu imagem="/imagens/em-preparo.png" texto="PENDENTES" />
        </Link>
        <Link to="/em-preparo" className="menu-link">
          <Menu imagem="/imagens/em-preparo2.png" texto="EM PREPARO" />
        </Link>
        <Link to="/prontos" className="menu-link">
          <Menu imagem="/imagens/prontos.png" texto="PRONTOS" />
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
                <p className='pedido'>Inicio do Preparo: {pedido.dateProcessed}</p>
                <p className='titulo-pedido'>Resumo do Pedido</p>
                {pedido.products.map((produto) => (
                  <div className="produto-card" key={produto.id}>
                    <p className='pedido'>{produto.quantity} - {produto.name}</p>
                  </div>
                ))}
              </div>
              <div className='botoes-pedidos'>
                <Botao className="confirmar-cancelar verde" onClick={() => btnPedidoPronto(pedido.id)}>PRONTO</Botao>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal
          className="modal-pedido-realizado"
          isOpen={modalPedidoProntoIsOpen}
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
            <FaTimes className="icone-fechar-modal" onClick={() => setPedidoProntoIsOpen(false)}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/pedido-pronto.png" alt="Imagem de sem nome do cliente" />
            <p className='p-pedido-realizado'>Pedido pronto!</p>
          </div>
        </Modal>
    </main>
  );
};

export default PedidosEmPreparo;
