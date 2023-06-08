import './InicialCozinha.css';
import Menu from '../Menu/Menu';
import { obterPedidos } from '../../API/api';
import { useEffect, useState } from 'react';
import Botao from '../Botao/Botao';

const InicialCozinha = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await obterPedidos();

        if (response.ok) {
          const data = await response.json();
          setPedidos(data);
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
        <Menu imagem="/imagens/em-preparo.png" texto="EM PRODUÇÃO" />
        <Menu imagem="/imagens/em-preparo2.png" texto="EM PREPARO" />
        <Menu imagem="/imagens/prontos.png" texto="PRONTOS" />
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
                <Botao className="confirmar-cancelar verde">PREPARAR</Botao>
                <Botao className="confirmar-cancelar vermelho">CANCELAR</Botao>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default InicialCozinha;
