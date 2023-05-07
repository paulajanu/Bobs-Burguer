import './CampoTexto.css'

const CampoTexto = (props) => {
    return (
        <div className='campoTexto'>
            <label>{props.label}</label> 
            <div className="inputContainer">
                {props.icon && <props.icon className="icon" />}
                <input type={props.type}/>
            </div>  
        </div>
    )
}

export default CampoTexto;