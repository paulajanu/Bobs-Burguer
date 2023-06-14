import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Mesas from '../Componentes/Mesas/Mesas';
import Cards from '../Componentes/Cards/Cards';
import Menu from '../Componentes/Menu/Menu';

jest.mock('../Componentes/Cards/Cards');
jest.mock('../Componentes/Menu/Menu');

describe('Mesas', () => {
  it('renderiza os componentes Cards e Menu corretamente', () => {
    render(
      <BrowserRouter>
        <Mesas />
      </BrowserRouter>
    );
    
    expect(Cards).toHaveBeenCalledTimes(9); // Verifica se o componente Cards foi chamado 9 vezes
    expect(Menu).toHaveBeenCalledTimes(3); // Verifica se o componente Menu foi chamado 3 vezes
  });
});