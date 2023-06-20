import GerenciarProdutos from "../../Componentes/GerenciarProdutos/GerenciarProdutos";
import Navegador from "../../Componentes/Navegador/Navegador";
import Voltar from "../../Componentes/Voltar/Voltar";

function PaginaGerenciarProdutos() {
    return (
      <div>
        <Navegador />
        <Voltar caminhoVoltar="/AdministrarProdutos"/>
        <div>
            <GerenciarProdutos />
        </div>
      </div>
    );
  }
  
export default PaginaGerenciarProdutos;