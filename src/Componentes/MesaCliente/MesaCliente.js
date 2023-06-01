import React from 'react';
import './MesaCliente.css';

const MesaCliente = ({ mesa }) => {
    return (
        <div className='mesa-cliente'>
            <div className='mesa'>
                <p className='label'>Mesa: {mesa}</p>
            </div>
            <div>
                <label className='label' htmlFor='cliente'>Cliente:</label>
                <input type='text' id='cliente' className='input-transparente'></input>
            </div>
        </div>
    );
};

export default MesaCliente;