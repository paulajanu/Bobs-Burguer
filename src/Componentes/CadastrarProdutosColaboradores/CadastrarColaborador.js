import './CadastrarProdutosColaboradores.css'
import Cadastros from '../Cadastros/Cadastros.js';
import { FaEnvelope, FaLock, FaUserAlt, FaUtensils, FaTimes } from "react-icons/fa";
import Botao from '../Botao/Botao.js';
import React, { useState } from 'react';
import { adicionarColaborador } from '../../API/Users.js';
import Modal from 'react-modal';

function CadastrarColaborador() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('');
  const [camposPreenchidos, setCamposPreenchidos] = useState(true);
  const [modalColaboradorCadastradoIsOpen, setColaboradorCadastradoIsOpen] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  Modal.setAppElement('#root');

  const cadastrarColaborador = (event) => {
    event.preventDefault();
    
    if (
      nome === '' ||
      email === '' ||
      senha === '' ||
      cargo === '' 
    ) {
      setCamposPreenchidos(false); 
      return;
    }

    adicionarColaborador(nome, email, senha, cargo)
      .then(() => {
        setColaboradorCadastradoIsOpen(true);
      })
      .catch((error) => {
        console.error('Erro', error);
        setMensagemErro(error.message);
      });
  };

  const aoDigitarNome = (event) => {
    setNome(event.target.value);
  };

  const aoDigitarEmail = (event) => {
    setEmail(event.target.value);
  };

  const aoDigitarSenha = (event) => {
    setSenha(event.target.value);
  };

  const aoSelecionarCargo = (event) => {
    setCargo(event.target.value);
  };

  const fecharModal = () => {
    setColaboradorCadastradoIsOpen(false);
    window.location.reload();
  };

  return (
      <div className="container-cadastro-produtos">
        <form onSubmit={cadastrarColaborador}>
            <Cadastros icon={FaUserAlt} label="Nome do colaborador:" type="text" id="nome" value={nome} onChange={aoDigitarNome}/>
            <Cadastros icon={FaEnvelope} label="E-mail:" type="email" id="email" value={email} onChange={aoDigitarEmail}/>
            <Cadastros icon={FaLock} label="Senha:" type="password" id="senha" value={senha} onChange={aoDigitarSenha}/>
            <Cadastros 
                icon={FaUtensils} 
                label="Cargo:" 
                type="select" 
                id="cargo"
                value={cargo}
                onChange={aoSelecionarCargo}
                options={[
                    { value: '', label: 'Selecione uma opção' },
                    { value: 'admin', label: 'Administrador' },
                    { value: 'garcom', label: 'Atendente' },
                    { value: 'cozinha', label: 'Chef de cozinha' },
                ]} 
            />
            {!camposPreenchidos && (
              <p className="observacao-campos">Por favor, preencha todos os campos.</p>
            )}
            {mensagemErro && (
              <p className="mensagem-erro">{mensagemErro}</p>
            )}
            <Botao className="azul confirmar-cadastrar">CADASTRAR</Botao>
            <Modal
          className="modal-pedido-realizado"
          isOpen={modalColaboradorCadastradoIsOpen}
          style={{
            overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            },
          }}
        >
          <div className="icone-modal">
            <FaTimes className="icone-fechar-modal" onClick={fecharModal}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/cadastro-colaborador.png" alt="Imagem de sem nome do cliente" />
            <p className='p-pedido-realizado'>Colaborador cadastrado!</p>
          </div>
        </Modal>
        </form>
      </div>
  );
};
  
export default CadastrarColaborador;