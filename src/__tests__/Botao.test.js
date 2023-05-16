import React from 'react';
import { render, screen } from '@testing-library/react';
import Botao from '../Componentes/Botao/Botao';

describe('Botao', () => {
    test('renderiza corretamente', () => {
      // Renderiza o componente Botao com o texto "Texto do Botão"
      render(<Botao>Texto do Botão</Botao>);
      const botaoElement = screen.getByRole('button');
  
      // Verifica se o elemento do botão está presente no documento
      expect(botaoElement).toBeInTheDocument();
    });
  
    test('renderiza o texto fornecido', () => {
      // Renderiza o componente Botao com o texto "Texto do Botão"
      render(<Botao>Texto do Botão</Botao>);
      const botaoElement = screen.getByRole('button');
  
      // Verifica se o elemento do botão contém o texto "Texto do Botão"
      expect(botaoElement).toHaveTextContent('Texto do Botão');
    });
  
    test('aplica a classe CSS fornecida', () => {
      // Renderiza o componente Botao com a classe CSS "botao-azul"
      render(<Botao className="botao-azul">Texto do Botão</Botao>);
      const botaoElement = screen.getByRole('button');
  
      // Verifica se o elemento do botão possui a classe CSS "botao" e "botao-azul"
      expect(botaoElement).toHaveClass('botao');
      expect(botaoElement).toHaveClass('botao-azul');
    });
  
    test('define o tipo de botão', () => {
      // Renderiza o componente Botao com o tipo de botão "submit"
      render(<Botao type="submit">Texto do Botão</Botao>);
      const botaoElement = screen.getByRole('button');

      // Verifica se o elemento do botão possui o atributo "type" com o valor "submit"
      expect(botaoElement).toHaveAttribute('type', 'submit');
    });
  });
  

 
