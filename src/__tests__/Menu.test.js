import React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from '../Componentes/Menu/Menu.js';

describe('Menu', () => {
    test('renderiza o botão corretamente', () => {
      render(<Menu/>);
      const botaoMenuElement = screen.getByRole('button');
  
      expect(botaoMenuElement).toBeInTheDocument();
    });

    test('verifica se a classe "menu" é aplicada corretamente', () => {
      render(<Menu/>);
      const botaoMenuElement = screen.getByRole('button');

      expect(botaoMenuElement).toHaveClass('menu');
    });

    test('renderiza a imagem corretamente', () => {
        render(<Menu/>);
        const imagemMenuElement = screen.getByRole('img');
    
        expect(imagemMenuElement).toBeInTheDocument();
    });

    test('verifica se o elemento "img" possui o atributo "src"', () => {
        const imagem = '/imagens/em-preparo.png';

        render(<Menu imagem={imagem}/>);
        const srcElement = screen.getByRole('img');
    
        expect(srcElement).toHaveAttribute('src', imagem)
    });
    
    test('verifica se o elemento "img" possui o atributo "alt"', () => {
        render(<Menu/>);
        const altMenuElement = screen.getByRole('img');
    
        expect(altMenuElement).toHaveAttribute('alt', 'Imagem do menu')
    });

    test('renderiza a linha separadora corretamente', () => {
        render(<Menu/>);
        const linhaSeparadoraElement = screen.getByRole('separator');
        
        expect(linhaSeparadoraElement).toBeInTheDocument();
        expect(linhaSeparadoraElement.tagName).toBe('HR');
    });

    test('renderiza o texto do elemento "p" corretamente', () => {
        const texto = 'MESA 1';

        render(<Menu texto={texto}/>);
        const textoElement = screen.getByText(texto);
    
        expect(textoElement).toBeInTheDocument();
    });
});