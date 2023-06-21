import React from 'react';
import { render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navegador from '../Componentes/Navegador/Navegador';
import PaginaGerenciarProdutos from '../Paginas/Administrador/PaginaGerenciarProdutos';
import GerenciarProdutos from '../Componentes/GerenciarProdutos/GerenciarProdutos';
import Voltar from '../Componentes/Voltar/Voltar';


jest.mock('../Componentes/GerenciarProdutos/GerenciarProdutos');
jest.mock('../Componentes/Navegador/Navegador.js');
jest.mock('../Componentes/Voltar/Voltar');

test('renderiza a pagina PaginaGerenciarProdutos corretamente', () => {

  render(
    <BrowserRouter>
        <PaginaGerenciarProdutos/>
    </BrowserRouter>
        );
  
  expect(Navegador).toHaveBeenCalled();
  expect(GerenciarProdutos).toHaveBeenCalled();
  expect(Voltar).toHaveBeenCalled();
});
