import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cards from '../Componentes/Cards/Cards.js';

describe('Cards', () => {
  it('renderiza corretamente sem a prop "numeroMesa"', () => {
    render(
      <Cards
        cardsClassName="custom-cards"
        imagemClassName="custom-imagem"
        textoClassName="custom-texto"
        texto1="Texto 1"
        texto2="Texto 2"
        imagem="imagem.jpg"
        adicionarProduto={() => {}}
      />
    );

    const cardsDiv = screen.getByTestId('div-cards');
    const texto1 = screen.getByText('Texto 1');
    const texto2 = screen.getByText('Texto 2');
    const imagem = screen.getByAltText('Imagem do card');

    expect(cardsDiv).toHaveClass('cards custom-cards');
    expect(texto1).toHaveClass('texto-card custom-texto');
    expect(texto2).toHaveClass('texto-card custom-texto');
    expect(imagem).toHaveClass('imagem-card custom-imagem');
    expect(imagem).toHaveAttribute('src', 'imagem.jpg');
  });

  it('renderiza corretamente com a prop "numeroMesa"', () => {
    render(
      <Router>
        <Cards
          cardsClassName="custom-cards"
          imagemClassName="custom-imagem"
          textoClassName="custom-texto"
          texto1="Texto 1"
          texto2="Texto 2"
          imagem="imagem.jpg"
          numeroMesa={1}
          adicionarProduto={() => {}}
        />
      </Router>
    );

    const link = screen.getByRole('link');
    const cardsDiv = screen.getByTestId('div-cards');
    const texto1 = screen.getByText('Texto 1');
    const texto2 = screen.getByText('Texto 2');
    const imagem = screen.getByAltText('Imagem do card');

    expect(link).toHaveAttribute('href', '/pedidos?mesa=1');
    expect(cardsDiv).toHaveClass('cards custom-cards');
    expect(texto1).toHaveClass('texto-card custom-texto');
    expect(texto2).toHaveClass('texto-card custom-texto');
    expect(imagem).toHaveClass('imagem-card custom-imagem');
    expect(imagem).toHaveAttribute('src', 'imagem.jpg');
  });

  it('chama corretamente a função "adicionarProduto" quando o componente é clicado', () => {
    const adicionarProdutoMock = jest.fn();

    render(
      <Cards
        cardsClassName="custom-cards"
        imagemClassName="custom-imagem"
        textoClassName="custom-texto"
        texto1="Texto 1"
        texto2="Texto 2"
        imagem="imagem.jpg"
        adicionarProduto={adicionarProdutoMock}
      />
    );

    const cardsDiv = screen.getByTestId('div-cards');
    fireEvent.click(cardsDiv);

    expect(adicionarProdutoMock).toHaveBeenCalledTimes(1);
  });
});
