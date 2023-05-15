import Mesas from '../../Componentes/Mesas/Mesas.js';
import Navegador from '../../Componentes/Navegador/Navegador.js';

function MenuGarcom() {
    return (
      <div className="MenuGarcom">
        <Navegador/>
        <Mesas/>
      </div>
    );
  }
  
  export default MenuGarcom;