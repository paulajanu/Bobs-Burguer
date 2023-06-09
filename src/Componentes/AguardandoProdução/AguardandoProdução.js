import './AguardandoProdução.css';
import Menu from '../Menu/Menu';
import { obterPedidos } from '../../API/api';
import { useEffect, useState } from 'react';
import Botao from '../Botao/Botao';
import { atualizarStatusPedido } from '../../API/api';
import { Link } from 'react-router-dom';

const AguardandoProducao = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await obterPedidos();
  
        if (response.ok) {
          const data = await response.json();
          // Filtra os pedidos com o status "PENDENTE"
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
    console.log('pedidoID', pedidoId);
    try {
      // Chama a função atualizarStatusPedido para atualizar o status do pedido para 'Em preparo'
      await atualizarStatusPedido(pedidoId, 'Em preparo');
      // Remove o pedido da lista de pedidos
      setPedidos((pedidosAnteriores) =>
        pedidosAnteriores.filter((pedido) => pedido.id !== pedidoId)
      );
    } catch (error) {
      console.error('Erro ao preparar o pedido', error);
    }
  };
  
  
  return (
    <main className='menu-cozinha'>
      <div className="menu-cozinha-coluna">
        <Link to="/Cozinha">
          <Menu imagem="/imagens/em-preparo.png" texto="PENDENTES" />
        </Link>
        <Link to="/em-preparo">
          <Menu imagem="/imagens/em-preparo2.png" texto="EM PREPARO" />
        </Link>
        <Link to="/prontos">
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
                    <p className='titulo-pedido'>Resumo do Pedido</p>
                  {pedido.products.map((produto) => (
                    <div className="produto-card" key={produto.id}>
                      <p className='pedido'>{produto.quantity} - {produto.name}</p>
                    </div>
                  ))}
                </div>
              <div className='botoes-pedidos'>
                <Botao className="confirmar-cancelar verde" onClick={() => btnPrepararPedido(pedido.id)}>PREPARAR</Botao>
                <Botao className="confirmar-cancelar vermelho">CANCELAR</Botao>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default AguardandoProducao;
