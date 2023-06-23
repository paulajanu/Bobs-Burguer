import { obterUsuarios } from "../../API/api"
import { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import './GerenciarColaboradores.css';
import { editarColaboradores, deletarColaboradores } from "../../API/api";
import Botao from "../Botao/Botao";
import Modal from 'react-modal';

const GerenciarColaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novosDados, setNovosDados] = useState({});
  const [modalAberto, setModalAberto] = useState(false);
  const [colaboradorExcluindo, setColaboradorExcluindo] = useState(null);

  Modal.setAppElement('#root');

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const response = await obterUsuarios();
        console.log('response', response);

        if (response.ok) {
          const data = await response.json();
          console.log('data', data);
          setColaboradores(data);
        } else {
          console.error("Erro ao obter os colaboradores da API");
        }
      } catch (error) {
        console.error("Erro ao obter os colaboradores da API", error);
      }
    };
    fetchColaboradores();
  }, []);

  const btnEditarColaborador = (colaborador) => {
    setEditando(colaborador);
    setNovosDados({ email: colaborador.email, cargo: colaborador.cargo });
  };
  

  const btnCancelarEdicao = () => {
    setEditando(null);
    setNovosDados({});
  };
  

  const btnSalvarEdicao = async () => {
    try {
      await editarColaboradores(editando.id, novosDados);
      setColaboradores((prevColaboradores) =>
        prevColaboradores.map((colaborador) =>
          colaborador.id === editando.id ? { ...colaborador, ...novosDados } : colaborador
        )
      );
      setEditando(null);
      setNovosDados({});
    } catch (error) {
      console.error('Erro ao editar colaborador:', error);
    }
  };
  
  const lidarComMudanca = (event) => {
    const { name, value } = event.target;
    setNovosDados((prevDados) => ({ ...prevDados, [name]: value }));
  };

  const abrirModalExclusao = (colaborador) => {
    setColaboradorExcluindo(colaborador);
    setModalAberto(true);
  };

  const fecharModalExclusao = () => {
    setColaboradorExcluindo(null);
    setModalAberto(false);
  };

  const executarExclusaoColaborador = async () => {
    try {
      await deletarColaboradores(colaboradorExcluindo.id);
      setColaboradores((prevColaboradores) =>
      prevColaboradores.filter((colaborador) => colaborador.id !== colaboradorExcluindo.id)
      );
      fecharModalExclusao();
    } catch (error) {
      console.error('Erro ao excluir colaborador:', error);
    }
  };

  return (
    <div className="principal">
      <div className="container-instrucao-gerenciar-produtos">
        <p className="instrucao-gerenciar-colaboradores">Lista de Colaboradores</p>
      </div>
      <div className="card-gerenciar-produtos">
        <div className="inicio-card-produtos">
            <span className="id-colaboradores">ID</span>
            <span className="email">E-mail</span>
            <span className="cargo">Cargo</span>
            <span className="acoes">Ações</span>
        </div>
        <div> 
          <hr className="listra-carrinho" />
        </div>
        {colaboradores.map((colaborador) => (
  <div key={colaborador.id} className="informacoes-produtos informacoes-colaboradores">
    {editando && editando.id === colaborador.id ? (
      <>
        <p className="id-produto p-informacoes">{colaborador.id}</p> {/* Adicionado aqui */}
        <input
          type="text"
          name="email"
          value={novosDados.email || colaborador.email}
          onChange={lidarComMudanca}
          className="input-editar"
        />
        <input
          type="text"
          name="role"
          value={novosDados.role || colaborador.role}
          onChange={lidarComMudanca}
          className="input-editar"
        />
        <Botao onClick={btnSalvarEdicao} className="verde">Salvar</Botao>
        <Botao onClick={btnCancelarEdicao} className="vermelho">Cancelar</Botao>
      </>
    ) : (
      <>
        <p className="id-produto p-informacoes">{colaborador.id}</p>
        <p className="nome-produto p-informacoes">{colaborador.email}</p>
        <p className="preco-produto p-informacoes">{colaborador.role}</p>
        <span className="icones">
          <FaPencilAlt className="icone-lixeira espacamento" onClick={() => btnEditarColaborador(colaborador)} />
          <FaTrash className="icone-lixeira" onClick={() => abrirModalExclusao(colaborador)}/>
        </span>
      </>
    )}
  </div>
        ))}
      </div>
      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModalExclusao}
        className="modal-pedido-realizado"
        style={{
          overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          },
        }}
      >
        <div className="conteudo-principal-modal">
          <img className='imagem-pedido-realizado' src="/imagens/confirmacao-excluir-colaborador.png" alt="Imagem da confirmação da exclusão do colaborador" />
          <p className='p-produto-excluido'>Você tem certeza que deseja excluir esse colaborador?</p>
        </div>
        <div className="botoes-modal">
          <Botao onClick={executarExclusaoColaborador} className="verde confirmar-cancelar">CONFIRMAR</Botao>
          <Botao onClick={fecharModalExclusao} className="vermelho confirmar-cancelar">CANCELAR</Botao>
        </div>
      </Modal>
    </div>
  );
};

export default GerenciarColaboradores;