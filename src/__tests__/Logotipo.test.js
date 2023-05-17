import React from 'react';
import Logotipo from '../Componentes/Logotipo/Logotipo.js';
import { render, screen } from '@testing-library/react';

describe('Logotipo', () => {
  test('verifica se o elemento "header" renderiza corretamente', () => {
    render(<Logotipo/>);
    const headerElement = screen.getByRole('banner');

    expect(headerElement).toBeInTheDocument();
  });

  test('verifica se a classe "logo" é aplicada corretamente', () => {
    render(<Logotipo/>);
    const headerElement = screen.getByRole('banner');

    expect(headerElement).toHaveClass('logo');
  });

  test('verifica se a imagem renderiza corretamente', () => {
    render(<Logotipo/>);
    const imagemElement = screen.getByRole('img');

    expect(imagemElement).toBeInTheDocument();
  });

  test('verifica se o elemento "img" possui o atributo "src"', () => {
    render(<Logotipo/>);
    const srcElement = screen.getByRole('img');

    expect(srcElement).toHaveAttribute('src', '/imagens/logo-bob.png')
  });

  test('verifica se o elemento "img" possui o atributo "alt"', () => {
    render(<Logotipo/>);
    const altElement = screen.getByRole('img');

    expect(altElement).toHaveAttribute('alt', "Logotipo da Bob's Burguer")
  });
});