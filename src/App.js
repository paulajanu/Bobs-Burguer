import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login/Login.js'
import MenuGarcom from './Paginas/MenuGarcom/MenuGarcom.js';
import Pedidos from './Paginas/Pedidos/Pedidos.js';
import AguardandoProduzirCozinha from './Paginas/Cozinha/AguardandoProduzir.js';
import PedidosEmPreparoCozinha from './Paginas/Cozinha/EmPreparoCozinha.js';
import PedidosProntosCozinha from './Paginas/Cozinha/PedidosProntosCozinha.js';
import PedidosProntosAtendentes from './Paginas/MenuGarcom/PedidosProntosAtendentes.js';
import PedidosEntreguesAtendente from './Paginas/MenuGarcom/PedidosEntreguesAtendente.js';
import MenuAdministrador from './Paginas/Administrador/MenuAdministrador.js';
import MenuAdministrarFuncionarios from './Paginas/Administrador/MenuAdministrarFuncionarios.js';
import MenuAdministrarProdutos from './Paginas/Administrador/MenuAdministrarProdutos.js';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/MenuGarcom" element={<MenuGarcom/>} />
        <Route path='/Pedidos' element={<Pedidos/>} />
        <Route path='/Cozinha' element={<AguardandoProduzirCozinha/>} />
        <Route path='/em-preparo' element={<PedidosEmPreparoCozinha/>} />
        <Route path='/prontos' element={<PedidosProntosCozinha/>} />
        <Route path='/prontos-atendente' element={<PedidosProntosAtendentes/>} />
        <Route path='/pedidos-entregues' element={<PedidosEntreguesAtendente/>} />
        <Route path='/MenuAdministrador' element={<MenuAdministrador/>} />
        <Route path='/AdministrarFuncionarios' element={<MenuAdministrarFuncionarios/>} />
        <Route path='/AdministrarProdutos' element={<MenuAdministrarProdutos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;