import CampoTexto from "../CampoTexto/CampoTexto";
import Botao from "../Botao/Botao.js";
import './Formulario.css';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Formulario = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const BtnEntrar = (event) => {
    event.preventDefault();

    // ... lógica de validação do formulário ...

    // redirecionar o usuário para outra página após o envio do formulário
    navigate('/Menugarcom');
  };

  const aoDigitarEmail = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  const Senha = (event) => {
    setSenha(event.target.value);
  };

  return (
    <section className="formulario">
      <form onSubmit={BtnEntrar}>
        <CampoTexto icon={FaEnvelope} label="E-mail:" type="email" value={email} onChange={aoDigitarEmail} />
        <CampoTexto icon={FaLock} label="Senha:" type="password" value={senha} onChange={Senha} />
        <Botao texto="ENTRAR" type="submit" />
      </form>
    </section>
  );
};

export default Formulario;