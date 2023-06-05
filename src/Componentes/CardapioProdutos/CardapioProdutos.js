import React, { useEffect, useState} from 'react';
import Cards from '../Cards/Cards.js';
import { obterProdutos } from '../../API/api.js';
import './CardapioProdutos.css';
import CardPedido from '../CardPedido/CardPedido.js';
import MesaCliente from '../MesaCliente/MesaCliente.js';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import Botao from '../Botao/Botao.js';
import {ProvedorCliente } from '../../Contextos/contextoCliente.js';

const CardapioProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [mostrarProdutos, setMostrarProdutos] = useState(false); // Estado para controlar a visibilidade dos produtos
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const location = useLocation();
  const mesaParams = queryString.parse(location.search);
  const mesaSelecionada = mesaParams.mesa || '';
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selecionarHamburguer, setSelecionarHamburguer] = useState('');
  const [selecionarOpcional, setSelecionarOpcional] = useState('');
  const [tipoHamburguer, setTipoHamburguer] = useState('');
  const [adicional, setAdicional] = useState('')

  const btnHamburguer = (event) => {
    setSelecionarHamburguer(event.target.value);
  };

  const btnOpcional = (event) => {
    setSelecionarOpcional (event.target.value); 
  }; 

  Modal.setAppElement('#root');

  useEffect(() => {
    if (!modalIsOpen) {
      setSelecionarHamburguer('');
      setSelecionarOpcional('');
    };
  }, [modalIsOpen]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await obterProdutos();
  
        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
        } else {
          console.error('Erro ao obter os produtos da API');
        }
      } catch (error) {
        console.error('Erro ao obter os produtos da API', error);
      };
    };
  
    fetchProdutos();
  }, []);
  
  const filtrarPorCategoria = (categoria) => {
    setCategoriaSelecionada(categoria);
    setMostrarProdutos(true); // Mostrar os produtos quando uma categoria for selecionada
  };

  const produtosFiltrados = categoriaSelecionada
    ? produtos.filter(produto => produto.category === categoriaSelecionada)
    : produtos;

    const adicionarProduto = (produto) => {
      console.log('Produto adicionado:', produto); // Imprime no console o produto que está sendo adicionado
      const produtoExistente = produtosSelecionados.find((p) => p.id === produto.id);
      // Verifica se o produto já existe na lista de produtos selecionados com base no seu ID
      if (!produtoExistente) {
        // Se o produto não existe na lista
        if (!modalIsOpen && produto.id === 5) {
          setIsOpen(true); // Abre o modal, se o produto é do tipo hambúrguer simples (id === 5) e o modal não estiver aberto
        } else {
          setProdutosSelecionados([...produtosSelecionados, produto]);
          // Adiciona o produto à lista de produtos selecionados, espalhando os produtos existentes e adicionando o novo produto
        };
      };
    };
    
    const removerProduto = (produto) => {
      const novosProdutosSelecionados = produtosSelecionados.filter((p) => p.id !== produto.id);
      setProdutosSelecionados(novosProdutosSelecionados);
    };
    
  return (
    <div className="container">
      <div className="content-left">
        <div className="cardapio-filtro">
          <button className="filtro-cardapio" onClick={() => filtrarPorCategoria('Café da manhã')}>Café da manhã</button>
          <button className="filtro-cardapio" onClick={() => filtrarPorCategoria('Hambúrgueres')}>Hambúrgueres</button>
          <button className="filtro-cardapio" onClick={() => filtrarPorCategoria('Acompanhamentos')}>Acompanhamentos</button>
          <button className="filtro-cardapio" onClick={() => filtrarPorCategoria('Bebidas')}>Bebidas</button>
        </div>
        <div className="cardapio-produtos">
          {mostrarProdutos &&  // Renderizar os produtos apenas se a variável mostrarProdutos for verdadeira
            produtosFiltrados.map((produto) => (
              <Cards
                key={produto.id}
                produto={produto} 
                imagem={produto.image}
                cardsClassName="cards-produto"
                texto1={produto.name}
                texto2={`R$ ${produto.price.toFixed(2)}`}
                textoClassName="texto-card-produtos"
                adicionarProduto={adicionarProduto} 
              />
            ))}
        </div>
      </div>
      <div className="content-right">
        <ProvedorCliente>
        <MesaCliente mesa={mesaSelecionada} />
          <CardPedido
            produtosSelecionados={produtosSelecionados}
            removerProduto={removerProduto}
            tipoHamburguer={tipoHamburguer}
            adicional={adicional}
          />
          </ProvedorCliente>
        <Modal
          className="modal"
          isOpen={modalIsOpen}
          style={{
            overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            },
          }}
        >
          <div className='selecao-opcoes'>
            <p className='instrucao-selecao'>Selecione o hambúrguer</p>
            <div className="radio-container">
              <div className="grupo-radio">
                <input
                  type="radio"
                  id="Bovino"
                  value="Bovino"
                  checked={selecionarHamburguer === 'Bovino'}
                  onChange={btnHamburguer}
                />
                <label htmlFor="bovino">Bovino</label>
              </div>
              <div className="grupo-radio espacamento-extra">
                <input
                  type="radio"
                  id="Frango"
                  value="Frango"
                  checked={selecionarHamburguer === 'Frango'} // Verifica se o valor selecionado é 'Frango'
                  onChange={btnHamburguer} // Chama a função btnHamburguer quando o valor do input é alterado
                />
                <label htmlFor="frango">Frango</label>
              </div>
              <div className="grupo-radio">
                <input
                  type="radio"
                  id="Vegetariano"
                  value="Vegetariano"
                  checked={selecionarHamburguer === 'Vegetariano'}
                  onChange={btnHamburguer}
                />
                <label htmlFor="vegetariano">Vegetariano</label>
              </div>
            </div>
            <div className="imagem-container">
              <img className='imagem-modal' src="/imagens/bovino.png" alt="Imagem Bovino" />
              <img className='imagem-modal espacamento-extra-imagem' src="/imagens/frango.png" alt="Imagem de Frango" />
              <img className='imagem-modal' src="/imagens/vegetariano.png" alt="Imagem de planta" />
            </div>
          </div>
          <div className='selecao-opcoes'>
            <p className='instrucao-selecao'>Selecione o opcional</p>
              <div className="radio-container-opcional">
                <div className="grupo-radio">
                  <input
                    type="radio"
                    id="Queijo"
                    value="Queijo"
                    checked={selecionarOpcional === 'Queijo'}
                    onChange={btnOpcional}
                  />
                  <label htmlFor="queijo">Queijo</label>
                </div>
                <div className="grupo-radio">
                  <input
                    type="radio"
                    id="Ovo"
                    value="Ovo"
                    checked={selecionarOpcional === 'Ovo'}
                    onChange={btnOpcional}
                    />
                  <label htmlFor="ovo">Ovo</label>
                </div>
                <div className="grupo-radio">
                  <input
                    type="radio"
                    id="Nenhum"
                    value="Nenhum"
                    checked={selecionarOpcional === 'Nenhum'}
                    onChange={btnOpcional}
                  />
                  <label htmlFor="nenhum">Nenhum</label>
                </div>
              </div>
              <div className="imagem-container">
                <img className='imagem-modal-maior' src="/imagens/queijo.png" alt="Imagem de queijo" />
                <img className='imagem-modal-maior espacamento-extra-imagem' src="/imagens/ovo.png" alt="Imagem de ovo" />
                <img className='imagem-modal' src="/imagens/nenhum.png" alt="Imagem de um X em vermelho" />
              </div>
          </div>
          <div className='botoes-modal'>
            <Botao className="transparente confirmar-cancelar" onClick={() => setIsOpen(false)}>CANCELAR</Botao>
            <Botao
              className="azul confirmar-cancelar"
              onClick={() => {
              setIsOpen(false); // Fechar o modal
                const produtoHamburguerSimples = produtos.find((produto) => produto.id === 5);
                  // Encontrar o produto do tipo hambúrguer simples na lista de produtos
                const produtoSelecionado = {
                  ...produtoHamburguerSimples,
                  tipoHamburguer: selecionarHamburguer,
                  adicional: selecionarOpcional,
                };
                  // Criar um objeto com os dados do produto selecionado, incluindo o tipo de hambúrguer e o adicional selecionados
                adicionarProduto(produtoSelecionado);
                  // Chamar a função adicionarProduto passando o produto selecionado como parâmetro para adicioná-lo à lista de produtos selecionados
                setTipoHamburguer(selecionarHamburguer);
                  // Atualizar o estado do tipo de hambúrguer com o valor selecionado
                setAdicional(selecionarOpcional);
                  // Atualizar o estado do adicional com o valor selecionado
              }}
            >
              CONFIRMAR
            </Botao>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CardapioProdutos;