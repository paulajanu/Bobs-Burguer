import Navegador from "../../Componentes/Navegador/Navegador.js";
import Menu from "../../Componentes/Menu/Menu.js";
import { Link } from "react-router-dom";

function MenuAdministrador() {
  return (
    <div>
      <Navegador/>
      <div className="menu-adm">
        <Link to="/AdministrarFuncionarios" className="menu-link">
          <Menu imagem="/imagens/administrar-funcionarios.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="ADMINISTRAR COLABORADORES"/>
        </Link>
        <Link to="/AdministrarProdutos" className="menu-link">
          <Menu imagem="/imagens/administrar-produtos.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="ADMINISTRAR PRODUTOS"/>
        </Link>
       </div>
    </div>
  );
};
  
export default MenuAdministrador;