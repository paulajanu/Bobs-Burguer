import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login/Login.js'
import MenuGarcom from './Paginas/MenuGarcom/MenuGarcom.js';
import Pedidos from './Paginas/Pedidos/Pedidos.js';
import AguardandoProduzirCozinha from './Paginas/Cozinha/AguardandoProduzir.js';
import PedidosEmPreparoCozinha from './Paginas/Cozinha/EmPreparoCozinha.js';
import PaginaPedidosProntosCozinha from './Paginas/Cozinha/PedidosProntosCozinha.js';
import PaginaPedidosProntos from './Paginas/MenuGarcom/PedidosProntosAtendentes.js';
import PedidosEntreguesAtendente from './Paginas/MenuGarcom/PedidosEntreguesAtendente.js';
import MenuAdministrador from './Paginas/Administrador/MenuAdministrador.js';
import MenuAdministrarFuncionarios from './Paginas/Administrador/MenuAdministrarFuncionarios.js';
import MenuAdministrarProdutos from './Paginas/Administrador/MenuAdministrarProdutos.js';
import AdicionarProdutos from './Paginas/Administrador/AdicionarProdutos.js';
import AdicionarFuncionario from './Paginas/Administrador/AdicionarFuncionario.js';
import PaginaGerenciarProdutos from './Paginas/Administrador/PaginaGerenciarProdutos.js';
import PaginaGerenciarColaboradores from './Paginas/Administrador/PaginaGerenciarColaboradores.js';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/MenuGarcom" element={<MenuGarcom/>} />
        <Route path='/Pedidos' element={<Pedidos/>} />
        <Route path='/Cozinha' element={<AguardandoProduzirCozinha/>} />
        <Route path='/em-preparo' element={<PedidosEmPreparoCozinha/>} />
        <Route path='/prontos' element={<PaginaPedidosProntosCozinha/>} />
        <Route path='/prontos-atendente' element={<PaginaPedidosProntos/>} />
        <Route path='/pedidos-entregues' element={<PedidosEntreguesAtendente/>} />
        <Route path='/MenuAdministrador' element={<MenuAdministrador/>} />
        <Route path='/AdministrarFuncionarios' element={<MenuAdministrarFuncionarios/>} />
        <Route path='/AdministrarProdutos' element={<MenuAdministrarProdutos/>} />
        <Route path='/AdicionarProdutos' element={<AdicionarProdutos/>} />
        <Route path='/AdicionarFuncionario' element={<AdicionarFuncionario/>} />
        <Route path='gerenciar-produtos' element={<PaginaGerenciarProdutos/>} />
        <Route path='/gerenciar-colaboradores' element={<PaginaGerenciarColaboradores/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;