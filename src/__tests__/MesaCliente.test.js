import React from 'react';
import { render, screen } from '@testing-library/react';
import MesaCliente from "../Componentes/MesaCliente/MesaCliente.js";

describe('MesaCliente', () => {
    it('renderiza corretamente o número da mesa', () => {
        const mesa = 1;
        render(<MesaCliente mesa={mesa} />);
        const mesaLabel = screen.getByText(`Mesa: ${mesa}`);
    
        expect(mesaLabel).toBeInTheDocument();
    });
    
    it('renderiza corretamente o campo de cliente', () => {
        render(<MesaCliente mesa={1} />);
        const inputCliente = screen.getByLabelText('Cliente:');
    
        expect(inputCliente).toBeInTheDocument();
        expect(inputCliente).toHaveAttribute('type', 'text');
        expect(inputCliente).toHaveClass('input-transparente');
    });
});