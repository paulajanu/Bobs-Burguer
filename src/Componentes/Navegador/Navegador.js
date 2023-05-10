import './Navegador.css';
import { Link } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa';

function Navegador () {
 return (
    <nav className='nav'>
        <Link to="/">
            <FaSignOutAlt className="icon-sair" /> 
        </Link>
    </nav>
 )
}

export default Navegador;