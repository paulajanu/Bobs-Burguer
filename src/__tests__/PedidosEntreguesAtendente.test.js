import { render } from '@testing-library/react';
import PedidosEntreguesAtendente from '../Paginas/MenuGarcom/PedidosEntreguesAtendente.js';
import PedidosEntregues from "../Componentes/PedidosEntregues/PedidosEntregues.js";
import Navegador from '../Componentes/Navegador/Navegador.js';

jest.mock('../Componentes/PedidosEntregues/PedidosEntregues.js');
jest.mock('../Componentes/Navegador/Navegador.js');

describe('PedidosEntreguesAtendente', () => {
  it('renderiza o componente Navegador e o componente PedidosEntregues corretamente', () => {
    render(<PedidosEntreguesAtendente />);
    
    expect(Navegador).toHaveBeenCalled();
    expect(PedidosEntregues).toHaveBeenCalled();
  });
});