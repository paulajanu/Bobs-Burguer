import CampoTexto from "../CampoTexto/CampoTexto"
import Botao from "../Botao/Botao.js"
import './Formulario.css'

const Formulario = () => { 
    return (
        <section className="formulario">
            <form>
                <CampoTexto label="E-mail:" type="email"/>
                <CampoTexto label="Senha:" type="password"/>
                <Botao texto="ENTRAR"/>
            </form>

        </section>
    )
}

export default Formulario; 