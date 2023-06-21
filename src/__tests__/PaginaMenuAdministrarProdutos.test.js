import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navegador from '../Componentes/Navegador/Navegador';
import Voltar from '../Componentes/Voltar/Voltar';
import MenuAdministrarProdutos from '../Paginas/Administrador/MenuAdministrarProdutos';

jest.mock('../Componentes/Navegador/Navegador.js');
jest.mock('../Componentes/Voltar/Voltar');

test('renderiza o componente MenuAdministrarProdutos corretamente', () => {
  render(
    <BrowserRouter>
      <MenuAdministrarProdutos/>
    </BrowserRouter>
  );

  // Verifica se o componente Navegador está presente
  expect(Navegador).toHaveBeenCalled();

  // Verifica se o componente Voltar está presente
  expect(Voltar).toHaveBeenCalled();

  // Verifica se o link para ADICIONAR PRODUTOS está presente
  expect(screen.getByText('ADICIONAR PRODUTOS')).toBeInTheDocument();

  // Verifica se o link para GERENCIAR PRODUTOS está presente
  expect(screen.getByText('GERENCIAR PRODUTOS')).toBeInTheDocument();
});
