import { render } from '@testing-library/react';
import MenuGarcom from '../Paginas/MenuGarcom/MenuGarcom';
import Mesas from '../Componentes/Mesas/Mesas';
import Navegador from '../Componentes/Navegador/Navegador';

jest.mock('../Componentes/Mesas/Mesas');
jest.mock('../Componentes/Navegador/Navegador');

describe('MenuGarcom', () => {
  it('renderiza o componente Navegador e o componente Mesas corretamente', () => {
    render(<MenuGarcom />);
    
    expect(Navegador).toHaveBeenCalled();
    expect(Mesas).toHaveBeenCalled();
  });
});

