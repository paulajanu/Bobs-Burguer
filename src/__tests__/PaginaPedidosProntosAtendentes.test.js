import React from 'react';
import { render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navegador from '../Componentes/Navegador/Navegador';
import PedidosProntosAtendentes from '../Componentes/PedidosProntos/PedidosProntosAtendente';
import PaginaPedidosProntos from '../Paginas/MenuGarcom/PedidosProntosAtendentes';

jest.mock('../Componentes/PedidosProntos/PedidosProntosAtendente');
jest.mock('../Componentes/Navegador/Navegador.js');

test('renderiza o componente PedidosEmPreparoCozinha corretamente', () => {

  render(
    <BrowserRouter>
        <PaginaPedidosProntos />
    </BrowserRouter>
        );
  
  // Verifique se os componentes PedidosProntosAtendentes e Navegador estão presentes
  expect(Navegador).toHaveBeenCalled();
  expect(PedidosProntosAtendentes).toHaveBeenCalled();
});
