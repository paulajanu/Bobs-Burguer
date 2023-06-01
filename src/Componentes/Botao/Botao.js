import './Botao.css'

const Botao = (props) => {
  const classeBotao = `botao ${props.className}`;
  // Concatena a classe CSS padrão "botao" com a classe fornecida através de props.className

  return (
     // Renderiza um elemento <button> com a classe buttonClassName e o tipo de botão definido através da propriedade type
    <button className={classeBotao} type={props.type} onClick={props.onClick}> 
      {props.children}
    </button>
  );
};

export default Botao;