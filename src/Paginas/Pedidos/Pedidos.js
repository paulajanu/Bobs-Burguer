import React from 'react';
// import queryString from 'query-string';
// import { useLocation } from 'react-router-dom';
import CardapioProdutos from '../../Componentes/CardapioProdutos/CardapioProdutos.js';
// import MesaCliente from '../../Componentes/MesaCliente/MesaCliente.js';
import Navegador from "../../Componentes/Navegador/Navegador.js";
import Voltar from '../../Componentes/Voltar/Voltar.js';
import './Pedidos.css';
import { useState } from 'react';

function Pedidos() {
  // const location = useLocation();
  // const mesaParams = queryString.parse(location.search);
  // const mesaSelecionada = mesaParams.mesa || '';

  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  const adicionarProduto = (produto) => {
    setProdutosSelecionados([...produtosSelecionados, produto]);
  };

  return (
    <div className="pedidos-container">
      <Navegador />

      <div className="pedidos-content">
        <div>
          <Voltar />
          {/* Passar a função adicionarProduto como propriedade */}
          <CardapioProdutos adicionarProduto={adicionarProduto} />
        </div>
        <div>
          {/* <MesaCliente mesa={mesaSelecionada} /> */}
        </div>
      </div>
    </div>
  );
}

export default Pedidos;