import './CardapioProdutos.css';
import Cards from '../Cards/Cards.js';
import { useEffect, useState } from 'react';
import { obterProdutos } from '../../API/api';


const CardapioProdutos = () => {
    const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos retornados da API
  
    useEffect(() => {
      const fetchProdutos = async () => {
        try {
          const response = await obterProdutos(); // Chamada assíncrona para obter os produtos da API
  
          if (response.ok) { // Verifica se a resposta da API foi bem-sucedida
            const data = await response.json(); // Extrai os dados da resposta em formato JSON
            setProdutos(data); // Atualiza o estado 'produtos' com os dados obtidos da API
          } else {
            console.error('Erro ao obter os produtos da API'); // Exibe um erro no console se a resposta da API não foi bem-sucedida
          }
        } catch (error) {
          console.error('Erro ao obter os produtos da API', error); // Exibe um erro no console se ocorrer um erro durante a chamada à API
        }
      };
  
      fetchProdutos(); // Chama a função fetchProdutos ao montar o componente (apenas uma vez)
    }, []);
  
    return (
      <div className="cardapio-produtos">
        {produtos.map((produto) => (
          <Cards
            key={produto.id}
            imagem={produto.image}
            cardsClassName="cards-produto"
            texto1={produto.name}
            texto2={`R$ ${produto.price.toFixed(2)}`}
            textoClassName="texto-card-produtos"
          />
        ))}
      </div>
    );
  };
  
  export default CardapioProdutos;

// const CardapioProdutos = () => {
//     return (
//         <div className="cardapio-produtos">
//             <Cards 
//                 imagem="/imagens/cafe-americano.png" 
//                 cardsClassName="cards-produto" 
//                 texto1="Café Americano" 
//                 texto2="R$ 5,00" 
//                 textoClassName="texto-card-produtos"
//             />
//             <Cards 
//                 imagem="/imagens/cafe-com-leite.png" 
//                 cardsClassName="cards-produto" 
//                 texto1="Café com leite" 
//                 texto2="R$ 7,00" 
//                 textoClassName="texto-card-produtos"
//             />
//             <Cards 
//                 imagem="/imagens/misto-quente.png" 
//                 cardsClassName="cards-produto"
//                 texto1="Misto quente" 
//                 texto2="R$ 10,00" 
//                 textoClassName="texto-card-produtos" 
//             />
//             <Cards 
//                 imagem="/imagens/suco-de-fruta.png" 
//                 cardsClassName="cards-produto"
//                 texto1="Suco de fruta" 
//                 texto2="R$ 7,00" 
//                 textoClassName="texto-card-produtos" 
//             />
//         </div>
//     );
// }

// export default CardapioProdutos;