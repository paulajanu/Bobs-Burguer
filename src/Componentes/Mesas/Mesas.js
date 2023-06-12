import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards.js';
import Menu from '../Menu/Menu.js';
import './Mesas.css';

function Mesas () {

    const cardsMesas = [
        {
            imagem: '/imagens/mesa-1.png',
            texto2: 'MESA 1',
        },
        {
            imagem: '/imagens/mesa-2.png',
            texto2: 'MESA 2',
        },
        {
            imagem: '/imagens/mesa-3.png',
            texto2: 'MESA 3',
        },
        {
            imagem: '/imagens/mesa-4.png',
            texto2: 'MESA 4',
        },
        {
            imagem: '/imagens/mesa-5.png',
            texto2: 'MESA 5',
        },
        {
            imagem: '/imagens/mesa-6.png',
            texto2: 'MESA 6',
        },
        {
            imagem: '/imagens/mesa-7.png',
            texto2: 'MESA 7',
        },
        {
            imagem: '/imagens/mesa-8.png',
            texto2: 'MESA 8',
        },
        {
            imagem: '/imagens/mesa-9.png',
            texto2: 'MESA 9',
        },
    ];

    return (
        <main className='menu-garcom'>
            <div className="menu-garcom-coluna">
                <Menu imagem="/imagens/em-preparo.png" texto="FAZER PEDIDO"/>
                <Link to="/prontos-atendente" className="menu-link">
                    <Menu imagem="/imagens/prontos.png" texto="PRONTOS"/>
                </Link>
                <Menu imagem="/imagens/entregues.png" texto="ENTREGUES"/>
            </div>
            <div className="menu-garcom-mesas">
                <p className="mesas-instrucao">Escolha a mesa para fazer o pedido</p>
                <div className="mesas">
                    {cardsMesas.map((cardsMesas, index) => (
                    <Cards
                        key={index}
                        imagem={cardsMesas.imagem}
                        texto2={cardsMesas.texto2}
                        cardsClassName="cards-mesa" 
                        imagemClassName="imagem-card" 
                        textoClassName="texto-card"
                        numeroMesa={index + 1}
                    />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Mesas;