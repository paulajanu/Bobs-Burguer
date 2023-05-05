import './CampoTexto.css'

const CampoTexto = (props) => {
    return (
        <div className='campoTexto'>
            <label>{props.label}</label>    
            <input type={props.type}/>
        </div>
    )
}

export default CampoTexto