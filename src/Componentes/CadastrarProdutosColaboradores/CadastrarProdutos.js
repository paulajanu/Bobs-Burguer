import './CadastrarProdutosColaboradores.css'
import Cadastros from '../Cadastros/Cadastros.js';
import { FaTag, FaClipboard, FaDollarSign, FaImage, FaCalendarDay, FaHamburger, FaTimes } from "react-icons/fa";
import Botao from '../Botao/Botao.js';
import React, { useState } from 'react';
import { adicionarProdutos } from '../../API/Products.js';
import Modal from 'react-modal';

function CadastrarProdutos() {
  const [idProduto, setIdProduto] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [imgProduto, setImgProduto] = useState('');
  const [categoriaProduto, setCategoriaProduto] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [camposPreenchidos, setCamposPreenchidos] = useState(true);
  const [modalProdutoCadastradoIsOpen, setProdutoCadastradoIsOpen] = useState(false);

  Modal.setAppElement('#root');

  const cadastrarProduto = (event) => {
    event.preventDefault();

    if (
      idProduto === '' ||
      nomeProduto === '' ||
      precoProduto === '' ||
      imgProduto === '' ||
      categoriaProduto === '' ||
      dataCadastro === ''
    ) {
      setCamposPreenchidos(false); 
      return;
    }

    adicionarProdutos(
      idProduto,
      nomeProduto,
      precoProduto,
      imgProduto,
      categoriaProduto,
      dataCadastro
    )
      .then(() => {
        setProdutoCadastradoIsOpen(true);
      })
      .catch((error) => {
        console.error('Erro', error);
      });
  };

  const aoDigitarNomeProduto = (event) => {
    setNomeProduto(event.target.value);
  };

  const aoDigitarPrecoProduto = (event) => {
    setPrecoProduto(event.target.value);
  };

  const aoDigitarDataCadastro = (event) => {
    setDataCadastro(event.target.value);
  };

  const aoDigitarCategoriaProduto = (event) => {
    setCategoriaProduto(event.target.value);
  };

  const aoDigitarIdProduto = (event) => {
    setIdProduto(event.target.value);
  };

  const aoDigitarImgProduto = (event) => {
    setImgProduto(event.target.value);
  };

  const fecharModal = () => {
    setProdutoCadastradoIsOpen(false);
    window.location.reload();
  };

  return (
      <div className="container-cadastro-produtos">
        <form onSubmit={cadastrarProduto}>
            <Cadastros icon={FaTag} label="Id:" type="number" id="id" value={idProduto} onChange={aoDigitarIdProduto}/>
            <Cadastros icon={FaClipboard} label="Nome do produto:" type="text" id="produto" value={nomeProduto} onChange={aoDigitarNomeProduto}/>
            <Cadastros icon={FaDollarSign} label="Preço:" type="number" id="preco" value={precoProduto} onChange={aoDigitarPrecoProduto}/>
            <Cadastros icon={FaImage} label="URL da imagem:" type="url" id="imagem" value={imgProduto} onChange={aoDigitarImgProduto}/>
            <Cadastros 
                icon={FaHamburger} 
                label="Categoria:" 
                type="select" 
                id="categoria"
                options={[
                    { value: '', label: 'Selecione uma opção' },
                    { value: 'Café da manhã', label: 'Café da manhã' },
                    { value: 'Hambúrgueres', label: 'Hambúrgueres' },
                    { value: 'Acompanhamentos', label: 'Acompanhamentos' },
                    { value: 'Bebidas', label: 'Bebidas' },
                ]} 
                value={categoriaProduto}
                onChange={aoDigitarCategoriaProduto}
            />
            <Cadastros icon={FaCalendarDay} label="Data de cadastro:" type="date" id="data" value={dataCadastro} onChange={aoDigitarDataCadastro}/>
            {!camposPreenchidos && (
              <p className="observacao-campos">Por favor, preencha todos os campos.</p>
            )}
            <Botao className="azul confirmar-cadastrar">CADASTRAR</Botao>
            <Modal
          className="modal-pedido-realizado"
          isOpen={modalProdutoCadastradoIsOpen}
          style={{
            overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            },
          }}
        >
          <div className="icone-modal">
            <FaTimes className="icone-fechar-modal" onClick={fecharModal}/>
          </div>
          <div className="conteudo-principal-modal">
            <img className='imagem-pedido-realizado' src="/imagens/cadastro-produto.png" alt="Imagem produto cadastrado" />
            <p className='p-pedido-realizado'>Produto cadastrado!</p>
          </div>
        </Modal>
        </form>
      </div>
  );
};
  
export default CadastrarProdutos;