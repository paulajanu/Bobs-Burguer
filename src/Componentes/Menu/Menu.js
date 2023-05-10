import './Menu.css';
import Mesas from '../../Componentes/Mesas/Mesas.js';

function Menu () {
 return (
    <aside className='menu'>
        <div className="menu-coluna">
            <img className="menu-coluna-img" src="/imagens/menu-em-preparo.png" alt="Menu - Pedidos em preparo"/>
            <img className="menu-coluna-img" src="/imagens/menu-prontos.png" alt="Menu - Pedidos prontos"/>
            <img className="menu-coluna-img" src="/imagens/menu-entregues.png" alt="Menu - Pedidos entregues"/>
        </div>
        <div className="menu-mesas">
            <Mesas />
        </div>
    </aside>
 )
}

export default Menu;