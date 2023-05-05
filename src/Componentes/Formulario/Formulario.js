import CampoTexto from "../CampoTexto/CampoTexto"
import './Formulario.css'

const Formulario = () => { 
    return (
        <section className="formulario">
            <form>
                <CampoTexto label="E-mail:" type="email"/>
                <CampoTexto label="Senha:" type="password"/>
            </form>

        </section>
    )
}

export default Formulario; 