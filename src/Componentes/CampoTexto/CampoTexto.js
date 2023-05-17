import './CampoTexto.css'
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CampoTexto = (props) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className='campoTexto'>
      <label htmlFor={props.id}>{props.label}</label> 
      <div className="inputContainer">
        {props.icon && <props.icon className="icon" />}
        <input  onChange={props.onChange} type={mostrarSenha ? 'text' : props.type} id={props.id}/>
        {props.type === 'password' && (
          <span className="iconeOlho" onClick={handleMostrarSenha} data-testid="icone-olho">
            {mostrarSenha ? < FaEye/> : <FaEyeSlash />}
          </span>
        )}
      </div>  
    </div>
  );
};

export default CampoTexto;