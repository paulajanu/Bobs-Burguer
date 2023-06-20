// import './Voltar.css';
// import { Link } from 'react-router-dom'
// import { FaArrowLeft } from 'react-icons/fa';

// function Voltar () {
//     return (
//         <div className='div-voltar'>
//             <Link to="/Menugarcom" className="link-voltar">
//                 <p className='p-voltar'>
//                     <span className='icon-voltar'>
//                         <FaArrowLeft className='icone-carrinho' />
//                     </span>
//                     VOLTAR
//                 </p>
//             </Link>
//         </div>
//     );
// };

// export default Voltar;

import React from 'react';
import './Voltar.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Voltar({ caminhoVoltar }) {
  return (
    <div className='div-voltar'>
      <Link to={caminhoVoltar} className="link-voltar">
        <p className='p-voltar'>
          <span className='icon-voltar'>
            <FaArrowLeft className='icone-carrinho' />
          </span>
          VOLTAR
        </p>
      </Link>
    </div>
  );
}

export default Voltar;
