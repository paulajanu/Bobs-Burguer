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
        if (response.status === 200) {
          return response.json()
            .then(() => {
              navigate('/Menugarcom');
            });
        } else if (response.status === 401) {
          setmensagemErro(Erros(response));
        } else if (response.status === 404) {
          setmensagemErro(Erros(response));
        } else {
          setmensagemErro(Erros(response));
        }
      })
      .catch((error) => {
        setmensagemErro(Erros(error.response));
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
        <CampoTexto icon={FaEnvelope} label="E-mail:" type="email" value={email} onChange={aoDigitarEmail} />
        <CampoTexto icon={FaLock} label="Senha:" type="password" value={senha} onChange={Senha} />
        {mensagemErro && (<p className="mensagem-erro">{mensagemErro}</p>)}
        <Botao texto="ENTRAR" type="submit" />
      </form>
    </section>
  );
};

export default Formulario;

// if (email === '' || senha === '') {
//   setmensagemErro('Por favor, preencha todos os campos!')
// } else {
//   navigate('/Menugarcom');
// }

// // ... lógica de validação do formulário ...

// // redirecionar o usuário para outra página após o envio do formulário