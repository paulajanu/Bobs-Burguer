import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login/Login.js'
import MenuGarcom from './Paginas/MenuGarcom/MenuGarcom.js';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/MenuGarcom" element={<MenuGarcom/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
