import './InicialCozinha.css';
import Menu from '../Menu/Menu';
import { obterPedidos } from '../../API/api';
import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';


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
          };
        };
      
        fetchPedidos();
    }, []);

    return (
        <main className='menu-cozinha'>
        <div className="menu-cozinha-coluna">
            <Menu imagem="/imagens/em-preparo.png" texto="EM PRODUÇÃO"/>
            <Menu imagem="/imagens/em-preparo2.png" texto="EM PREPARO"/>
            <Menu imagem="/imagens/prontos.png" texto="PRONTOS"/>
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
        <div className="cards-container">
      {pedidos.map((pedido) => (
        <div className="pedido-card" key={pedido.id}>
          <p>Nome do pedido: {pedido.client}</p>
          <div className="produtos-container">
            {pedido.products.map((produto) => (
              <div className="produto-card" key={produto.id}>
                <p>{produto.name}</p>
                <p>Preço: R$ {produto.price}</p>
                <p>Quantidade: {produto.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
    </div>

        {/* <div className='pedidos'>
            <p className="pedidos-instrucao">Sem pedidos no momento!</p>
            <div className='div-img-sem-pedidos'>
                <img className='img-sem-pedidos' src="/imagens/sem-pedidos.png" alt="Imagem de sem pedidos"/>
            </div>
         </div> */}
         </main>
)
}

export default InicialCozinha;
