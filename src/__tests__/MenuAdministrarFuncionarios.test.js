import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MenuAdministrarFuncionarios from '../Paginas/Administrador/MenuAdministrarFuncionarios.js';
import Navegador from '../Componentes/Navegador/Navegador.js';
import Menu from '../Componentes/Menu/Menu.js';
import Voltar from '../Componentes/Voltar/Voltar.js';

jest.mock('../Componentes/Navegador/Navegador.js');
jest.mock('../Componentes/Voltar/Voltar.js');
jest.mock('../Componentes/Menu/Menu.js');

describe('MenuAdministrarFuncionarios', () => {
    it('renderiza o componente corretamente', () => {
      render(
        <BrowserRouter>
          <MenuAdministrarFuncionarios />
        </BrowserRouter>
      );
 
      expect(Navegador).toHaveBeenCalled();
      expect(Menu).toHaveBeenCalled();
      expect(Voltar).toHaveBeenCalled();
    });
});
