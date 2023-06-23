import './Menu.css';

function Menu(props) {
  return (
    <button className="menu">
      <img src={props.imagem} alt="Imagem do menu" className={`${props.tamanhoImagem}`} />
      <hr />
      <p className={`texto-menu ${props.estiloFonte}`}>{props.texto}</p>
    </button>
  );
}


export default Menu;