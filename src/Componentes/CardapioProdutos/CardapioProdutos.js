import './CardapioProdutos.css';
import Cards from '../Cards/Cards.js';

const CardapioProdutos = () => {
    return (
        <div className="cardapio-produtos">
            <Cards 
                imagem="/imagens/cafe-americano.png" 
                cardsClassName="cards-produto" 
                texto1="Café Americano" 
                texto2="R$ 5,00" 
                textoClassName="texto-card-produtos"
            />
            <Cards 
                imagem="/imagens/cafe-com-leite.png" 
                cardsClassName="cards-produto" 
                texto1="Café com leite" 
                texto2="R$ 7,00" 
                textoClassName="texto-card-produtos"
            />
            <Cards 
                imagem="/imagens/misto-quente.png" 
                cardsClassName="cards-produto"
                texto1="Misto quente" 
                texto2="R$ 10,00" 
                textoClassName="texto-card-produtos" 
            />
            <Cards 
                imagem="/imagens/suco-de-fruta.png" 
                cardsClassName="cards-produto"
                texto1="Suco de fruta" 
                texto2="R$ 7,00" 
                textoClassName="texto-card-produtos" 
            />
        </div>
    );
}

export default CardapioProdutos;