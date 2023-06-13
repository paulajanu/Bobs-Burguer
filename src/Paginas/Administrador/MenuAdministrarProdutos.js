import Navegador from "../../Componentes/Navegador/Navegador.js";
import Menu from "../../Componentes/Menu/Menu.js";
// import { Link } from "react-router-dom";

function MenuAdministrarProdutos() {
  return (
    <div>
      <Navegador/>
      <div className="menu-adm">
        {/* <Link to="/menuGarcom"> */}
                <Menu imagem="/imagens/adicionar-produto.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="ADICIONAR PRODUTOS"/>
        {/* </Link> */}
        {/* <Link to="/prontos-atendente"> */}
            <Menu imagem="/imagens/gerenciar-produto.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="GERENCIAR PRODUTOS"/>
        {/* </Link> */}
       </div>
    </div>
  );
};
  
export default MenuAdministrarProdutos;