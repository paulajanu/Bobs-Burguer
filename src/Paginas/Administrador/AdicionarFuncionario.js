import CadastrarColaborador from '../../Componentes/CadastrarProdutosColaboradores/CadastrarColaborador.js';
import Navegador from '../../Componentes/Navegador/Navegador.js';
import Voltar from '../../Componentes/Voltar/Voltar.js';

function GerenciarFuncionarios() {
  return (
    <div className="gerenciar-funcionarios">
      <Navegador/>
      <Voltar caminhoVoltar="/AdministrarFuncionarios"/>
      <div>
        <CadastrarColaborador/>
      </div>
    </div>
  );
};
  
export default GerenciarFuncionarios;