import './Navegador.css';
import { FaSignOutAlt } from 'react-icons/fa';

function Navegador () {
 return (
    <nav className='nav'>
        <FaSignOutAlt className="icon-sair" />
    </nav>
 )
}

export default Navegador;