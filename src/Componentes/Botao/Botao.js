import './Botao.css'

const Botao = (props) => {
  const classeBotao = `botao ${props.className}`;

  return (
    <button className={classeBotao} type={props.type} onClick={props.onClick}> 
      {props.children}
    </button>
  );
};

export default Botao;