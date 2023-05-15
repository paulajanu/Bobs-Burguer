import Cards from '../Cards/Cards';
import Menu from '../Menu/Menu';
import './Mesas.css';

function Mesas () {

    const cardsMesas = [
        {
            imagem: '/imagens/mesa-1.png',
            texto: 'MESA 1',
        },
        {
            imagem: '/imagens/mesa-2.png',
            texto: 'MESA 2',
        },
        {
            imagem: '/imagens/mesa-3.png',
            texto: 'MESA 3',
        },
        {
            imagem: '/imagens/mesa-4.png',
            texto: 'MESA 4',
        },
        {
            imagem: '/imagens/mesa-5.png',
            texto: 'MESA 5',
        },
        {
            imagem: '/imagens/mesa-6.png',
            texto: 'MESA 6',
        },
        {
            imagem: '/imagens/mesa-7.png',
            texto: 'MESA 7',
        },
        {
            imagem: '/imagens/mesa-8.png',
            texto: 'MESA 8',
        },
        {
            imagem: '/imagens/mesa-9.png',
            texto: 'MESA 9',
        },
      ];

 return (
    <main className='menu-garcom'>
        <div className="menu-garcom-coluna">
            <Menu imagem="/imagens/em-preparo.png" texto="EM PREPARO"/>
            <Menu imagem="/imagens/prontos.png" texto="PRONTOS"/>
            <Menu imagem="/imagens/entregues.png" texto="ENTREGUES"/>
        </div>
        <div className="menu-garcom-mesas">
            <p className="mesas-instrucao">Escolha a mesa para fazer o pedido</p>
            <div className="mesas">
                {cardsMesas.map((cardsMesas, index) => (
                <Cards
                    key={index}
                    imagem={cardsMesas.imagem}
                    texto={cardsMesas.texto}
                    cardsClassName="cards-mesa" 
                    imagemClassname="imagem-card" 
                    textoClassName="texto-card"
                />
                ))}
            </div>
        </div>
    </main>
 )
}

export default Mesas;