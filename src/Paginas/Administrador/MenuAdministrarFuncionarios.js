import Navegador from "../../Componentes/Navegador/Navegador.js";
import Menu from "../../Componentes/Menu/Menu.js";
import { Link } from "react-router-dom";
import Voltar from "../../Componentes/Voltar/Voltar.js";

function MenuAdministrarFuncionarios() {
  return (
    <div>
      <Navegador/>
      <Voltar caminhoVoltar="/MenuAdministrador"/>
      <div className="menu-adm">
        <Link to="/AdicionarFuncionario" className="menu-link">
                <Menu imagem="/imagens/adicionar-colaborador.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="ADICIONAR COLABORADOR"/>
        </Link>
        <Link to="/gerenciar-colaboradores" className="menu-link">
            <Menu imagem="/imagens/gerenciar-colaborador.png"  tamanhoImagem="imagem-grande" estiloFonte="texto-menu-maior" texto="GERENCIAR COLABORADORES"/>
        </Link>
       </div>
    </div>
  );
};
  
export default MenuAdministrarFuncionarios;