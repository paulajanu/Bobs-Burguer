import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Paginas/Login/Login.js';
import { MemoryRouter } from 'react-router-dom';

describe('Login', () => {
  test('renderiza o Logotipo', () => {
    render(    
        <MemoryRouter>
            <Login />
        </MemoryRouter>);
    const logotipoElement = screen.getByRole('img', { name: "Logotipo da Bob's Burguer" });
    expect(logotipoElement).toBeInTheDocument();
  });

  test('renderiza o Formulário', () => {
    render(    
        <MemoryRouter>
            <Login />
        </MemoryRouter>);
    const formularioElement = screen.getByLabelText('E-mail:');
    expect(formularioElement).toBeInTheDocument();
  });
});
