import PedidosProntosAtendentes from "../../Componentes/PedidosProntos/PedidosProntosAtendente.js";
import Navegador from "../../Componentes/Navegador/Navegador.js";

function PaginaPedidosProntos() {
  return (
    <div>
      <Navegador/>
      <PedidosProntosAtendentes/>
    </div>
  );
};
  
export default PaginaPedidosProntos;