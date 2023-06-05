import React from 'react';
import './MesaCliente.css';
import { useContext } from 'react';
import { ContextoCliente } from '../../Contextos/contextoCliente';


const MesaCliente = ({ mesa }) => {
    const {cliente, addCliente} = useContext(ContextoCliente);

    const nomeCliente = (event) => {
        const inputValue = event.target.value;
        console.log(inputValue); 
        addCliente(inputValue);
    };

    return (
        <div className='mesa-cliente'>
            <div className='mesa'>
                <p className='label'>Mesa: {mesa}</p>
            </div>
            <div>
                <label className='label' htmlFor='cliente'>Cliente:</label>
                <input
                    type='text'
                    id='cliente'
                    className='input-transparente'
                    value={cliente}
                    onChange={nomeCliente}
                />
            </div>
        </div>
    );
};

export default MesaCliente;