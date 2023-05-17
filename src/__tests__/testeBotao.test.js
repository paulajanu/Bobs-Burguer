import React from 'react';
import { render, screen } from '@testing-library/react';
import Botao from '../Componentes/Botao/Botao';

describe('Botao', () => {
    test('verifica se o botão renderiza corretamente', () => {
      render(<Botao>Texto do Botão</Botao>);
      const botaoElement = screen.getByRole('button');
  
      // Verifica se o elemento do botão está presente no documento
      expect(botaoElement).toBeInTheDocument();
    });
  
    test('verifica se o texto fornecido renderiza corretamente', () => {
      render(<Botao>Texto do Botão</Botao>);
      const botaoElement = screen.getByRole('button');
  
      // Verifica se o elemento do botão contém o texto "Texto do Botão"
      expect(botaoElement).toHaveTextContent('Texto do Botão');
    });
  
    test('verifica se a classe "botao" e "botao-azul" são aplicadas corretamente', () => {
      render(<Botao className="botao-azul">Texto do Botão</Botao>);
      const botaoElement = screen.getByRole('button');
  
      // Verifica se o elemento do botão possui a classe CSS "botao" e "botao-azul"
      expect(botaoElement).toHaveClass('botao');
      expect(botaoElement).toHaveClass('botao-azul');
    });
  
    test('verifica o tipo de botão', () => {
      render(<Botao type="submit">Texto do Botão</Botao>);
      const botaoElement = screen.getByRole('button');

      // Verifica se o elemento do botão possui o atributo "type" com o valor "submit"
      expect(botaoElement).toHaveAttribute('type', 'submit');
    });
  });
  