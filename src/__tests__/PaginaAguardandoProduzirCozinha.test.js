import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AguardandoProduzirCozinha from '../Paginas/Cozinha/AguardandoProduzir';
import Navegador from '../Componentes/Navegador/Navegador';
import AguardandoProducao from '../Componentes/AguardandoProdução/AguardandoProdução';

jest.mock('../Componentes/AguardandoProdução/AguardandoProdução');
jest.mock('../Componentes/Navegador/Navegador.js');

test('renderiza o componente AguardandoProduzirCozinha corretamente', () => {
  render(
<BrowserRouter>
    <AguardandoProduzirCozinha />
</BrowserRouter> 
    );
  
  // Verifica se os componentes AguardandoProducao e Navegador estão presentes
  expect(Navegador).toHaveBeenCalled();
  expect(AguardandoProducao).toHaveBeenCalled();
});
