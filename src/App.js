import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login/Login.js'
import MenuGarcom from './Paginas/MenuGarcom/MenuGarcom.js';
import Pedidos from './Paginas/Pedidos/Pedidos.js';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/MenuGarcom" element={<MenuGarcom/>} />
        <Route path='/Pedidos' element={<Pedidos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
