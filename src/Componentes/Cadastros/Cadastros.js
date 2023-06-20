import './Cadastros.css'
import React from 'react';

const Cadastros = (props) => {

    return (
        <div className='campo-texto-cadastros'>
          <label htmlFor={props.id}>{props.label}</label> 
          <div className="input-container-cadastros">
            {props.icon && <props.icon className="icon-cadastros" />}
            {props.type === 'select' ? (
              <select onChange={props.onChange} id={props.id}>
                {props.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input onChange={props.onChange} type={props.type} id={props.id}/>
            )}
          </div>  
        </div>
    );
};

export default Cadastros;