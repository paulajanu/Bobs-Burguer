import Formulario from '../../Componentes/Formulario/Formulario.js';
import Logotipo from '../../Componentes/Logotipo/Logotipo.js';

function Login() {
  return (
    <div className="Login" data-testid="div-login">
      <Logotipo/>
      <Formulario/>
    </div>
  );
}

export default Login;