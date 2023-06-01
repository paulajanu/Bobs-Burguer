import { render, screen, fireEvent} from '@testing-library/react';
import CampoTexto from '../Componentes/CampoTexto/CampoTexto';
import { FaEye } from 'react-icons/fa';

describe('CampoTexto', () => {
  it('deve alternar a exibição da senha quando o ícone de olho for clicado', () => {
    render(
      <CampoTexto
        label="Senha"
        type="password"
        id="senha"
        icon={FaEye}
      />
    );
  
      // Verifica se o campo de senha é do tipo "password" inicialmente
    const inputSenha = screen.getByLabelText('Senha');
    expect(inputSenha.type).toBe('password');
  
      // Verifica se o ícone de olho está presente
    const iconeOlho = screen.getByTestId('icone-olho');
    expect(iconeOlho).toBeInTheDocument();
  
      // Simula o clique no ícone de olho
    fireEvent.click(iconeOlho);
  
      // Verifica se o campo de senha é do tipo "text" após o clique no ícone de olho
    expect(inputSenha.type).toBe('text');
  });
});