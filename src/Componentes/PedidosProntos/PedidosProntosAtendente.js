import { Link } from 'react-router-dom';
import { atualizarStatusPedido, obterPedidos } from '../../API/api';
import { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import Botao from '../Botao/Botao';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

const PedidosProntosAtendentes = () => {
  const [pedidos, setPedidos] = useState([]);
  const [modalEntregarPedidoIsOpen, setEntregarPedidoIsOpen] = useState(false);

  Modal.setAppElement('#root');
  
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await obterPedidos();

        if (response.ok) {
          const data = await response.json();
          // Filtra os pedidos com o status "Em Preparo"
          const pedidosEmPreparo = data.filter((pedido) => pedido.status === 'Pronto');
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

  const btnEntregarPedido = async (pedidoId) => {
    console.log('pedidoID', pedidoId);
    try {
      // Chama a função atualizarStatusPedido para atualizar o status do pedido para 'Entregar'
      await atualizarStatusPedido(pedidoId, 'Entregue');
      // Remove o pedido da lista de pedidos
      setPedidos((pedidosAnteriores) =>
        pedidosAnteriores.filter((pedido) => pedido.id !== pedidoId)
      );
      setEntregarPedidoIsOpen(true);
    } catch (error) {
      console.error('Erro ao entregar o pedido', error);
    }
  };

  return (
    <main className='menu-cozinha'>
      <div className="menu-cozinha-coluna">
      <Link to="/menuGarcom" className="menu-link">
            <Menu imagem="/imagens/em-preparo.png" texto="FAZER PEDIDO"/>
        </Link>
        <Link to="/prontos-atendente" className="menu-link">
            <Menu imagem="/imagens/prontos.png" texto="PRONTOS"/>
        </Link>
        <Link to="/pedidos-entregues" className="menu-link">
         <Menu imagem="/imagens/entregues.png" texto="ENTREGUES"/>
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
                <p className='pedido'>Pedido Pronto: {pedido.dateProcessed}</p>
                <p className='titulo-pedido'>Resumo do Pedido</p>
                {pedido.products.map((produto) => (
                  <div className="produto-card" key={produto.id}>
                    <p className='pedido'>{produto.quantity} - {produto.name}</p>
                  </div>
                ))}
              </div>
              <div className='botoes-pedidos'>
                <Botao className="confirmar-cancelar verde" onClick={() => btnEntregarPedido(pedido.id)}>ENTREGAR</Botao>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal
          className="modal-pedido-realizado"
          isOpen={modalEntregarPedidoIsOpen}
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
            <FaTimes className="icone-fechar-modal" onClick={() => setEntregarPedidoIsOpen(false)}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/pedido-entregue.png" alt="Imagem de sem nome do cliente" />
            <p className='p-pedido-realizado'>Pedido entregue!</p>
          </div>
        </Modal>
    </main>
  );
};

export default PedidosProntosAtendentes;