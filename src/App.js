import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login/Login.js'
import MenuGarcom from './Paginas/MenuGarcom/MenuGarcom.js';
import Pedidos from './Paginas/Pedidos/Pedidos.js';
import AguardandoProduzirCozinha from './Paginas/Cozinha/AguardandoProduzir.js';
import PedidosEmPreparoCozinha from './Paginas/Cozinha/EmPreparoCozinha.js';
import PedidosProntosCozinha from './Paginas/Cozinha/PedidosProntosCozinha.js';
import PedidosProntosAtendentes from './Paginas/MenuGarcom/PedidosProntosAtendentes.js';

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
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;