import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Voltar from '../Componentes/Voltar/Voltar';

describe('Voltar', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Voltar />
      </Router>
    );
    expect(screen.getByText('VOLTAR')).toBeInTheDocument();
  });
});