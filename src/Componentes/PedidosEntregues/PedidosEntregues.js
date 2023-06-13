import { Link } from 'react-router-dom';
import { obterPedidos } from '../../API/api';
import { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';

const PedidosEmPreparo = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await obterPedidos();

        if (response.ok) {
          const data = await response.json();
          // Filtra os pedidos com o status "Entregue"
          const pedidosEmPreparo = data.filter((pedido) => pedido.status === 'Entregue');
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

  return (
    <main className='menu-cozinha'>
      <div className="menu-cozinha-coluna">
        <Link to="/menuGarcom" className="menu-link">
            <Menu imagem="/imagens/em-preparo.png"  tamanhoImagem="imagem-pequena" estiloFonte="texto-menu-menor" texto="FAZER PEDIDO"/>
        </Link>
        <Link to="/prontos-atendente" className="menu-link">
            <Menu imagem="/imagens/prontos.png"  tamanhoImagem="imagem-pequena" estiloFonte="texto-menu-menor" texto="PRONTOS"/>
        </Link>
        <Link to="/pedidos-entregues" className="menu-link">
         <Menu imagem="/imagens/entregues.png"  tamanhoImagem="imagem-pequena" estiloFonte="texto-menu-menor" texto="ENTREGUES"/>
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
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default PedidosEmPreparo;
