import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import CardPedido from '../../Componentes/CardPedido/CardPedido.js';
import CardapioProdutos from '../../Componentes/CardapioProdutos/CardapioProdutos.js';
import MesaCliente from '../../Componentes/MesaCliente/MesaCliente.js';
import Navegador from "../../Componentes/Navegador/Navegador.js";
import Voltar from '../../Componentes/Voltar/Voltar.js';
import './Pedidos.css';

function Pedidos() {
  const location = useLocation();
  const mesaParams = queryString.parse(location.search);
  const mesaSelecionada = mesaParams.mesa || '';

  return (
    <div className="pedidos-container">
      <Navegador />

      <div className="pedidos-content">
        <div>
          <Voltar />
          <CardapioProdutos />
        </div>
        <div>
          <MesaCliente mesa={mesaSelecionada} />
          <CardPedido />
        </div>
      </div>
    </div>
  );
}

export default Pedidos;