import { render } from '@testing-library/react';
import AdicionarFuncionario from '../Paginas/Administrador/AdicionarFuncionario.js';
import CadastrarColaborador from '../Componentes/CadastrarProdutosColaboradores/CadastrarColaborador.js';
import Navegador from '../Componentes/Navegador/Navegador.js';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../Componentes/CadastrarProdutosColaboradores/CadastrarColaborador.js');
jest.mock('../Componentes/Navegador/Navegador.js');

describe('AdicionarFuncionario', () => {
  it('renderiza o componente Navegador e o componente CadastrarColaborador corretamente', () => {
    render(
        <BrowserRouter>
            <AdicionarFuncionario />
        </BrowserRouter>
    );
   
    expect(Navegador).toHaveBeenCalled();
    expect(CadastrarColaborador).toHaveBeenCalled();
  });
});
