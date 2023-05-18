import './Voltar.css';
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';

function Voltar () {
 return (
    <div className='div-voltar'>
        <Link to="/Menugarcom" className="link-voltar">
            {/* <FaArrowLeft className="icon-voltar" /> 
            <p className="p-voltar">VOLTAR</p> */}
            <p className='p-voltar'>
                <span className='icon-voltar'>
                    <FaArrowLeft className='icone-carrinho' />
                </span>
                    VOLTAR
            </p>
        </Link>
    </div>
 )
}

export default Voltar;