import React from 'react';
import { render } from '@testing-library/react';
import Pedidos from '../Paginas/Pedidos/Pedidos.js';
import CardapioProdutos from '../Componentes/CardapioProdutos/CardapioProdutos.js';
import Navegador from '../Componentes/Navegador/Navegador.js';
import Voltar from '../Componentes/Voltar/Voltar.js';

jest.mock('../Componentes/CardapioProdutos/CardapioProdutos');
jest.mock('../Componentes/Navegador/Navegador.js');
jest.mock('../Componentes/Voltar/Voltar.js');

describe('Pedidos', () => {
  test('renderiza o componente Pedidos corretamente', () => {
    render(<Pedidos />);
   
    expect(Navegador).toHaveBeenCalled();

    expect(Voltar).toHaveBeenCalled();

    expect(CardapioProdutos).toHaveBeenCalled();
  });
});
