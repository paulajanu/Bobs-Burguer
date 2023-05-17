import { Link } from 'react-router-dom';
import './Cards.css';

const Cards = (props) => {

    const cardsClassName = `cards ${props.cardsClassName}`;
    const imagemClassName = `imagem-card ${props.imagemClassName}`;
    const textoClassName = `texto-card ${props.textoClassName}`;

    return (
        <Link to={props.paginaDestino} className='link'>
        <div className={cardsClassName} data-testid="div-cards">
            <img src={props.imagem} alt="Imagem do card" className={imagemClassName}/>
            <p className={textoClassName}>{props.texto}</p>
        </div>
        </Link>
    )
}

export default Cards;