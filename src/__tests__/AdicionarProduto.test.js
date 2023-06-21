import { render } from '@testing-library/react';
import AdicionarProdutos from '../Paginas/Administrador/AdicionarProdutos.js';
import CadastrarProdutos from '../Componentes/CadastrarProdutosColaboradores/CadastrarProdutos.js';
import Navegador from '../Componentes/Navegador/Navegador.js';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../Componentes/CadastrarProdutosColaboradores/CadastrarProdutos.js');
jest.mock('../Componentes/Navegador/Navegador.js');

describe('AdicionarProduto', () => {
  it('renderiza o componente Navegador e o componente CadastrarProdutos corretamente', () => {
    render(
        <BrowserRouter>
            <AdicionarProdutos />
        </BrowserRouter>
    );
   
    expect(Navegador).toHaveBeenCalled();
    expect(CadastrarProdutos).toHaveBeenCalled();
  });
});
