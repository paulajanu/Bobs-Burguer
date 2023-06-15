import { render } from '@testing-library/react';
import PedidosEmPreparoCozinha from '../Paginas/Cozinha/EmPreparoCozinha.js';
import PedidosEmPreparo from "../Componentes/PedidosEmPreparo/PedidosEmPreparo.js";
import Navegador from '../Componentes/Navegador/Navegador.js';

jest.mock('../Componentes/PedidosEmPreparo/PedidosEmPreparo.js');
jest.mock('../Componentes/Navegador/Navegador.js');

describe('EmPreparoCozinha', () => {
  it('renderiza o componente Navegador e o componente PedidosEmPreparo corretamente', () => {
    render(<PedidosEmPreparoCozinha />);
    
    expect(Navegador).toHaveBeenCalled();
    expect(PedidosEmPreparo).toHaveBeenCalled();
  });
});