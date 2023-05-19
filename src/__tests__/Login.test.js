import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Paginas/Login/Login.js';
import { MemoryRouter } from 'react-router-dom';

describe('Login', () => {
  test('renderiza o componente logotipo corretamente', () => {
    render(    
        <MemoryRouter>
            <Login />
        </MemoryRouter>);
    const logotipoElement = screen.getByRole('img', { name: "Logotipo da Bob's Burguer" });
    expect(logotipoElement).toBeInTheDocument();
  });

  test('renderiza o componente formulário corretamente', () => {
    render(    
        <MemoryRouter>
            <Login />
        </MemoryRouter>);
    const formularioElement = screen.getByLabelText('E-mail:');
    expect(formularioElement).toBeInTheDocument();
  });
});
