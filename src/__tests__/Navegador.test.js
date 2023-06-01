import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navegador from '../Componentes/Navegador/Navegador'; 

describe('Navegador', () => {
  test('renderiza o elemento "nav" corretamente', () => {
    render(
      <Router>
        <Navegador />
      </Router>
    );
  
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });
  
  test('renderiza o ícone de sair corretamente', () => {
    render(
      <Router>
        <Navegador />
      </Router>
    );
  
    const iconElement = screen.getByRole('link');
    expect(iconElement).toBeInTheDocument();
  });
});