import { Link } from 'react-router-dom';
import { obterPedidos } from '../../API/Orders.js';
import { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';

const PedidosProntosCozinha = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await obterPedidos();

        if (response.ok) {
          const data = await response.json();
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

  return (
    <main className='menu-cozinha'>
      <div className="menu-cozinha-coluna">
        <Link to="/Cozinha" className="menu-link">
          <Menu imagem="/imagens/em-preparo.png"  tamanhoImagem="imagem-pequena" estiloFonte="texto-menu-menor" texto="PENDENTES" />
        </Link>
        <Link to="/em-preparo" className="menu-link">
          <Menu imagem="/imagens/em-preparo2.png"  tamanhoImagem="imagem-pequena" estiloFonte="texto-menu-menor" texto="EM PREPARO" />
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

export default PedidosProntosCozinha;
