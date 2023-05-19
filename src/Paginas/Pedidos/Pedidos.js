import CardPedido from '../../Componentes/CardPedido/CardPedido.js';
import CardapioProdutos from '../../Componentes/CardapioProdutos/CardapioProdutos.js';
import FiltroCardapio from '../../Componentes/FiltroCardapio/FiltroCardapio.js';
import MesaCliente from '../../Componentes/MesaCliente/MesaCliente.js';
import Navegador from "../../Componentes/Navegador/Navegador.js";
import Voltar from '../../Componentes/Voltar/Voltar.js';
import './Pedidos.css';

function Pedidos() {
  return (
    <div className="pedidos-container">
      <Navegador />

      <div className="pedidos-content">
        <div>
          <Voltar />
          <FiltroCardapio />
          <CardapioProdutos />
        </div>
        <div>
          <MesaCliente />
          <CardPedido />
        </div>
      </div>
    </div>
  );
}

export default Pedidos;

