import CampoTexto from "../CampoTexto/CampoTexto";
import Botao from "../Botao/Botao.js";
import './Formulario.css';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import login from '../../API/Login.js';
import { Erros } from '../../Erros/erros';
import { setIdUsuario, setItens } from "../../util/localStorage.js";

const Formulario = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setmensagemErro] = useState('');
  
  const BtnEntrar = (event) => {
    event.preventDefault();
    login(email, senha)
      .then(async(response) => {
        if (response.status === 200) {
          const resp = await response.json();
          setItens(resp.accessToken);
          setIdUsuario(resp.user.id);
  
          if (resp.user.role === 'garcom') {
            navigate('/MenuGarcom');
          } else if (resp.user.role === 'cozinha') {
            navigate('/Cozinha');
          } else if (resp.user.role === 'admin') {
            navigate('/MenuAdministrador');
          }
        } else if (response.status === 400) {
          return response.json()
          .then((mensagemErro) => {
            const erro = Erros(mensagemErro);
            setmensagemErro(erro);
          });
        }
      })
      .catch((error) => {
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
        {mensagemErro && (<p className="mensagem-erro" data-testid="mensagem-erro">{mensagemErro}</p>)}
        <Botao type="submit" className="azul entrar">ENTRAR</Botao>
      </form>
    </section>
  );
};

export default Formulario;