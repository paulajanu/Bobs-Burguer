import { obterProdutos } from "../../API/api"
import { useEffect, useState } from "react";
import './GerenciarProdutos.css';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { editarProdutos, deletarProdutos } from "../../API/api";
import Botao from "../Botao/Botao";
import Modal from 'react-modal';

const GerenciarProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [novosDados, setNovosDados] = useState({});
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoExcluindo, setProdutoExcluindo] = useState(null);

  Modal.setAppElement('#root');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await obterProdutos();

        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
        } else {
          console.error("Erro ao obter os produtos da API");
        }
      } catch (error) {
        console.error("Erro ao obter os produtos da API", error);
      }
    };

    fetchProdutos();
  }, []);

  const btnEditarProduto = (produto) => {
    setProdutoEditando(produto);
    setNovosDados({ ...produto });
  };

  const btnCancelarEdicao = () => {
    setProdutoEditando(null);
    setNovosDados({});
  };

  const btnSalvarEdicao = async () => {
    try {
      await editarProdutos(produtoEditando.id, novosDados);
      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto.id === produtoEditando.id ? { ...produto, ...novosDados } : produto
        )
      );
      setProdutoEditando(null);
      setNovosDados({});
    } catch (error) {
      console.error('Erro ao editar Produto:', error);
    }
  };

  const lidarComMudanca = (event) => {
    const { name, value } = event.target;
    setNovosDados((prevDados) => ({ ...prevDados, [name]: value }));
  };

  const abrirModalExclusao = (produto) => {
    setProdutoExcluindo(produto);
    setModalAberto(true);
  };

  const fecharModalExclusao = () => {
    setProdutoExcluindo(null);
    setModalAberto(false);
  };

  const executarExclusaoProduto = async () => {
    try {
      await deletarProdutos(produtoExcluindo.id);
      setProdutos((prevProdutos) =>
        prevProdutos.filter((produto) => produto.id !== produtoExcluindo.id)
      );
      fecharModalExclusao();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div>
      <div className="container-instrucao-gerenciar-produtos">
        <p className="instrucao-gerenciar-produtos">Lista de Produtos</p>
      </div>
      <div className="card-gerenciar-produtos">
        <div className="inicio-card-produtos">
          <p className="id-nome-preco-acoes">
            <span className="id">ID</span>
            <span className="nome">Produto</span>
            <span className="preco">Valor</span>
            <span className="acoes">Ações</span>
          </p>
          <hr className="listra-carrinho" />
        </div>
        {produtos.map((produto) => (
          <div key={produto.id} className="informacoes-produtos">
            <p className="id-produto p-informacoes">{produto.id}</p>
            {produtoEditando && produtoEditando.id === produto.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={novosDados.name || produto.name}
                  onChange={lidarComMudanca}
                  className="input-editar"
                />
                <input
                  type="text"
                  name="price"
                  value={novosDados.price === undefined ? produto.price : novosDados.price}
                  onChange={lidarComMudanca}
                  className="input-editar"
                />
                <Botao onClick={btnSalvarEdicao} className="verde">Salvar</Botao>
                <Botao onClick={btnCancelarEdicao} className="vermelho">Cancelar</Botao>
              </>
            ) : (
              <>
                <p className="nome-produto p-informacoes">{produto.name}</p>
                <p className="preco-produto p-informacoes">R${produto.price},00</p>
                <span className="icones">
                  <FaPencilAlt
                    className="icone-lixeira espacamento"
                    onClick={() => btnEditarProduto(produto)}
                  />
                  <FaTrash
                    className="icone-lixeira"
                    onClick={() => abrirModalExclusao(produto)}
                  />
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
          <img className='imagem-pedido-realizado' src="/imagens/confirmacao-excluir-produto.png" alt="Imagem da confirmação da exclusão do produto" />
          <p className='p-produto-excluido'>Você tem certeza que deseja excluir esse produto?</p>
        </div>
        <div className="botoes-modal">
          <Botao onClick={executarExclusaoProduto} className="verde confirmar-cancelar">CONFIRMAR</Botao>
          <Botao onClick={fecharModalExclusao} className="vermelho confirmar-cancelar">CANCELAR</Botao>
        </div>
      </Modal>
    </div>
  );
};

export default GerenciarProdutos;