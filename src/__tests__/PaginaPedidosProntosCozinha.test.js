import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PaginaPedidosProntosCozinha from '../Paginas/Cozinha/PedidosProntosCozinha';
import PedidosProntosCozinha from '../Componentes/PedidosProntos/PedidosProntosCozinha';
import Navegador from '../Componentes/Navegador/Navegador';

jest.mock('../Componentes/PedidosProntos/PedidosProntosCozinha');
jest.mock('../Componentes/Navegador/Navegador.js');

test('renderiza o componente PaginaPedidosProntosCozinha corretamente', () => {
  render(
<BrowserRouter>
    <PaginaPedidosProntosCozinha />
</BrowserRouter> 
    );
  
  // Verifica se os componentes PedidosProntosCozinha e Navegador estão presentes
  expect(Navegador).toHaveBeenCalled();
  expect(PedidosProntosCozinha).toHaveBeenCalled();
});
