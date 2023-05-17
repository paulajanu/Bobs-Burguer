import React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from '../Componentes/Menu/Menu.js';

describe('Menu', () => {
    test('verifica se o botão renderiza corretamente', () => {
      render(<Menu/>);
      const botaoMenuElement = screen.getByRole('button');
  
      expect(botaoMenuElement).toBeInTheDocument();
    });

    test('verifica se a classe "menu" é aplicada corretamente', () => {
      render(<Menu/>);
      const botaoMenuElement = screen.getByRole('button');

      expect(botaoMenuElement).toHaveClass('menu');
    });

    test('verifica se a imagem renderiza corretamente', () => {
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

    test('verifica se a linha separadora é renderizada corretamente', () => {
        render(<Menu/>);
        const linhaSeparadoraElement = screen.getByRole('separator');
        
        expect(linhaSeparadoraElement).toBeInTheDocument();
        expect(linhaSeparadoraElement.tagName).toBe('HR');
    });

    test('verifica se o texto do elemento "p" é renderizado corretamente', () => {
        const texto = 'MESA 1';

        render(<Menu texto={texto}/>);
        const textoElement = screen.getByText(texto);
    
        expect(textoElement).toBeInTheDocument();
    });
});