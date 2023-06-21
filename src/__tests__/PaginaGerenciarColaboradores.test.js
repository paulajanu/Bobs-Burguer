import React from 'react';
import { render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navegador from '../Componentes/Navegador/Navegador';
import GerenciarColaboradores from '../Componentes/GerenciarColaboradores/GerenciarColaboradores';
import Voltar from '../Componentes/Voltar/Voltar';
import PaginaGerenciarColaboradores from '../Paginas/Administrador/PaginaGerenciarColaboradores';


jest.mock('../Componentes/GerenciarColaboradores/GerenciarColaboradores');
jest.mock('../Componentes/Navegador/Navegador.js');
jest.mock('../Componentes/Voltar/Voltar');

test('renderiza a pagina PaginaGerenciarColaboradores corretamente', () => {

  render(
    <BrowserRouter>
        <PaginaGerenciarColaboradores/>
    </BrowserRouter>
        );
  
  expect(Navegador).toHaveBeenCalled();
  expect(GerenciarColaboradores).toHaveBeenCalled();
  expect(Voltar).toHaveBeenCalled();
});
