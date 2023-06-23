import Navegador from "../../Componentes/Navegador/Navegador.js";
import Menu from "../../Componentes/Menu/Menu.js";
import { Link } from "react-router-dom";
import Voltar from "../../Componentes/Voltar/Voltar.js";

function MenuAdministrarProdutos() {
  return (
    <div>
      <Navegador/>
      <Voltar caminhoVoltar="/MenuAdministrador"/>
      <div className="menu-adm">
        <Link to="/AdicionarProdutos" className="menu-link">
          <Menu imagem="/imagens/adicionar-produto.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="ADICIONAR PRODUTOS"/>
        </Link>
        <Link to="/gerenciar-produtos" className="menu-link">
          <Menu imagem="/imagens/gerenciar-produto.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="GERENCIAR PRODUTOS"/>
        </Link>
       </div>
    </div>
  );
};
  
export default MenuAdministrarProdutos;