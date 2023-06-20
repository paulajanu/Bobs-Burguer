import GerenciarColaboradores from "../../Componentes/GerenciarColaboradores/GerenciarColaboradores";
import Navegador from "../../Componentes/Navegador/Navegador";
import Voltar from "../../Componentes/Voltar/Voltar";

function PaginaGerenciarColaboradores() {
    return (
      <div>
        <Navegador />
        <Voltar caminhoVoltar="/AdministrarFuncionarios"/>
        <div>
            <GerenciarColaboradores />
        </div>
      </div>
    );
  }
  
export default PaginaGerenciarColaboradores;