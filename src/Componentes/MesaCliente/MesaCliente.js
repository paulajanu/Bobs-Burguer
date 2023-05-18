import './MesaCliente.css';

const MesaCliente = () => {
    return (
        <div className='mesa-cliente'>
            <div className='mesa'>
                <p className='label'>Mesa:</p>
            </div>
            <div>
                <label className='label' htmlFor='cliente'>Cliente:</label>
                <input type='text' id='cliente' className='input-transparente'></input>
            </div>
        </div>
    )
}

export default MesaCliente