import Botao from '../Botao/Botao';
import './CardPedido.css';
import {FaShoppingCart } from 'react-icons/fa';

const CardPedido = () => {
    return (
            <div className='card-pedido'>
                <p className='resumo-compra'>
                    <span className='span-carrinho'>
                        <FaShoppingCart className='icone-carrinho' />
                    </span>
                    Resumo da Compra
                </p>
                <div className='inicio-carrinho'>
                    <p className='itens-qtd-preco'>
                    <span className='item'>Item</span>
                    <span className='quantidade'>Qtd</span>
                    <span className='preco'>Preço</span>
                    <hr className='listra-carrinho'/>
                </p>
                </div>
                <div className='container-total'> 
                    <hr className='listra-total'/>
                    <p className='total'>
                        Total
                    </p>
                </div>
                <div className='botoes'> 
                    <Botao className='transparente confirmar-cancelar'>CANCELAR</Botao>
                    <Botao className='azul confirmar-cancelar'>CONFIRMAR</Botao>
                </div>
            </div>
    );
};

export default CardPedido;