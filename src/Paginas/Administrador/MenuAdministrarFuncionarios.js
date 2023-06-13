import Navegador from "../../Componentes/Navegador/Navegador.js";
import Menu from "../../Componentes/Menu/Menu.js";
// import { Link } from "react-router-dom";

function MenuAdministrarFuncionarios() {
  return (
    <div>
      <Navegador/>
      <div className="menu-adm">
        {/* <Link to="/menuGarcom"> */}
                <Menu imagem="/imagens/adicionar-colaborador.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="ADICIONAR COLABORADOR"/>
        {/* </Link> */}
        {/* <Link to="/prontos-atendente"> */}
            <Menu imagem="/imagens/gerenciar-colaborador.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="GERENCIAR COLABORADORES"/>
        {/* </Link> */}
       </div>
    </div>
  );
};
  
export default MenuAdministrarFuncionarios;