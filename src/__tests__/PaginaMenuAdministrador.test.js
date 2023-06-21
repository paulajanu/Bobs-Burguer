import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navegador from '../Componentes/Navegador/Navegador';
import MenuAdministrador from '../Paginas/Administrador/MenuAdministrador';

jest.mock('../Componentes/Navegador/Navegador.js');

test('renderiza o componente MenuAdministrador corretamente', () => {
  render(
    <BrowserRouter>
      <MenuAdministrador />
    </BrowserRouter>
  );

  // Verifica se o componente Navegador está presente
  expect(Navegador).toHaveBeenCalled();

  // Verifica se o link para Administrar Funcionários está presente
  expect(screen.getByText('ADMINISTRAR COLABORADORES')).toBeInTheDocument();

  // Verifica se o link para Administrar Produtos está presente
  expect(screen.getByText('ADMINISTRAR PRODUTOS')).toBeInTheDocument();
});
