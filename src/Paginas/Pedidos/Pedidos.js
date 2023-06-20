import React from 'react';
import CardapioProdutos from '../../Componentes/CardapioProdutos/CardapioProdutos.js';
import Navegador from "../../Componentes/Navegador/Navegador.js";
import Voltar from '../../Componentes/Voltar/Voltar.js';
import { useState } from 'react';

function Pedidos() {

  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  const adicionarProduto = (produto) => {
    setProdutosSelecionados([...produtosSelecionados, produto]);
  };

  return (
    <div className="pedidos-container">
      <Navegador />
      <div className="pedidos-content">
        <div>
          <Voltar caminhoVoltar="/Menugarcom"/>
          {/* Passar a função adicionarProduto como propriedade */}
          <CardapioProdutos adicionarProduto={adicionarProduto} />
        </div>
      </div>
    </div>
  );
};

export default Pedidos;