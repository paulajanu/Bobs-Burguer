import CadastrarProdutos from '../../Componentes/CadastrarProdutosColaboradores/CadastrarProdutos.js';
import Navegador from '../../Componentes/Navegador/Navegador.js';
import Voltar from '../../Componentes/Voltar/Voltar.js';

function AdicionarProdutos() {
  return (
    <div className="adicionar-produtos">
      <Navegador/>
      <Voltar caminhoVoltar="/AdministrarProdutos"/>
      <div>
        <CadastrarProdutos/>
      </div>
    </div>
  );
};
  
export default AdicionarProdutos;