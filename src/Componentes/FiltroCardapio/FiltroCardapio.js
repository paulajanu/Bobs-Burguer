import Botao from '../Botao/Botao';
import './FiltroCardapio.css';

const Cardapio = () => {
    return (
        <div className="cardapio-filtro">
            <Botao type="button" className="filtro-cardapio">Café da manhã</Botao>
            <Botao type="button" className="filtro-cardapio">Hambúrguer</Botao>
            <Botao type="button" className="filtro-cardapio">Acompanhamentos</Botao>
            <Botao type="button" className="filtro-cardapio">Bebidas</Botao>
        </div>
    );
}

export default Cardapio;