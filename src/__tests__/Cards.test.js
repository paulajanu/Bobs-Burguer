import React from 'react';
import Cards from '../Componentes/Cards/Cards.js';
import { render, screen } from '@testing-library/react';

describe('Cards', () => {
    test('verifica se a "div" renderiza corretamente', () => {
        render(<Cards />);
        const divElement = screen.getByTestId('div-cards');
        expect(divElement).toBeInTheDocument();
    });

    test('verifica se a imagem renderiza corretamente', () => {
        render(<Cards/>);
        const imagemCardsElement = screen.getByRole('img');
    
        expect(imagemCardsElement).toBeInTheDocument();
    });

    test('verifica se o elemento "img" possui o atributo "src"', () => {
        const imagemCards = '/imagens/mesa-1.png';

        render(<Cards imagem={imagemCards}/>);
        const srcCardsElement = screen.getByRole('img');
    
        expect(srcCardsElement).toHaveAttribute('src', imagemCards)
    });
    
    test('verifica se o elemento "img" possui o atributo "alt"', () => {
        render(<Cards/>);
        const altCardsMenuElement = screen.getByRole('img');
    
        expect(altCardsMenuElement).toHaveAttribute('alt', 'Imagem do card')
    });

    test('verifica se o texto do elemento "p" é renderizado corretamente', () => {
        const textoCards = 'EM PREPARO';

        render(<Cards texto={textoCards}/>);
        const textoCardsElement = screen.getByText(textoCards);
    
        expect(textoCardsElement).toBeInTheDocument();
    });

    test('verifica se as classes CSS fornecidas são aplicadas corretamente', () => {
        const cardsClassName = 'cards-estilo';
        const imagemClassName = 'imagem-estilo';
        const textoClassName = 'texto-estilo';
        const textoCards = 'EM PREPARO';

        render(
          <Cards
            texto={textoCards}
            cardsClassName={cardsClassName}
            imagemClassName={imagemClassName}
            textoClassName={textoClassName}
          />
        );
        const divElement = screen.getByTestId('div-cards');
        const imagemCardsElement = screen.getByRole('img');
        const textoCardsElement = screen.getByText(textoCards);

        expect(divElement).toHaveClass(cardsClassName);
        expect(imagemCardsElement).toHaveClass(imagemClassName);
        expect(textoCardsElement).toHaveClass(textoClassName);
    });
});