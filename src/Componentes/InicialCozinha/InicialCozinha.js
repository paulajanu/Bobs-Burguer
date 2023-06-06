import './InicialCozinha.css';
import Menu from '../Menu/Menu';

const InicialCozinha = () => {
    return (
        <main className='menu-cozinha'>
        <div className="menu-cozinha-coluna">
            <Menu imagem="/imagens/em-preparo.png" texto="EM PRODUÇÃO"/>
            <Menu imagem="/imagens/em-preparo2.png" texto="EM PREPARO"/>
            <Menu imagem="/imagens/prontos.png" texto="PRONTOS"/>
        </div>
        <div className='pedidos'>
            <p className="pedidos-instrucao">Sem pedidos no momento!</p>
            <div className='div-img-sem-pedidos'>
                <img className='img-sem-pedidos' src="/imagens/sem-pedidos.png" alt="Imagem de sem pedidos"/>
            </div>
         </div>
         </main>
)
}

export default InicialCozinha;
