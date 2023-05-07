import CampoTexto from "../CampoTexto/CampoTexto";
import Botao from "../Botao/Botao.js";
import './Formulario.css';
import { FaEnvelope, FaLock } from "react-icons/fa";

const Formulario = () => { 
    return (
        <section className="formulario">
            <form>
                <CampoTexto icon={FaEnvelope} label="E-mail:" type="email"/>
                <CampoTexto icon={FaLock} label="Senha:" type="password"/>
                <Botao texto="ENTRAR"/>
            </form>
        </section>
    )
}

export default Formulario; 