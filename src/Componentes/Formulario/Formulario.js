import CampoTexto from "../CampoTexto/CampoTexto";
import Botao from "../Botao/Botao.js";
import './Formulario.css';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import login from '../../API/api';
import { Erros } from '../../Erros/erros';

const Formulario = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setmensagemErro] = useState('');
  
  const BtnEntrar = (event) => {
    event.preventDefault();
    login(email, senha)
      .then((response) => {
        // A função 'then' é chamada quando a Promise retornada pela função 'login' é resolvida
        if (response.status === 200) {
          // Verifica se o status da resposta é 200 (sucesso)
          return response.json().then(() => {
            // Chama a função 'json' da resposta para extrair os dados em formato JSON
            // Em seguida, chama a função 'then' novamente para realizar ação desejada, no caso, a navegação para '/Menugarcom'
            navigate('/Menugarcom');
          });
        } else if (response.status === 400) {
          // Verifica se o status da resposta é 400 (erro de requisição inválida)
          return response.json()
          .then((mensagemErro) => {
            // Chama a função 'json' da resposta para extrair a mensagem de erro em formato JSON
            // Em seguida, chama a função 'then' para manipular a mensagem de erro e atualizar o estado 'mensagemErro'
            const erro = Erros(mensagemErro);
            setmensagemErro(erro);
          });
        }
      })
      .catch((error) => {
        // O bloco 'catch' é chamado se ocorrer um erro durante o processamento da requisição ou da resposta
        // Nesse caso, atualiza o estado 'mensagemErro' com uma mensagem de erro genérica
        setmensagemErro(Erros(error));
      });
  };

  const aoDigitarEmail = (event) => {
    setEmail(event.target.value);
  };

  const Senha = (event) => {
    setSenha(event.target.value);
  };

  return (
    <section className="formulario">
      <form onSubmit={BtnEntrar}>
        <CampoTexto icon={FaEnvelope} label="E-mail:" type="email" id="email" value={email} onChange={aoDigitarEmail} />
        <CampoTexto icon={FaLock} label="Senha:" type="password" id="senha" value={senha} onChange={Senha} />
        {mensagemErro && (<p className="mensagem-erro">{mensagemErro}</p>)}
        <Botao type="submit" className="azul">ENTRAR</Botao>
      </form>
    </section>
  );
};

export default Formulario;