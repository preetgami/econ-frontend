import React, { useContext, useState } from 'react'
import Basket_Card from './Basket_Card';
import useAuth from '../shared/context/auth-hook';
import Modal from "../Modal/Modal"
import Checkout from "../pages/Checkout"
import Paybutton from '../payments/Paybutton';
function Basketlist(props) {
    const { token, login, logout, userId } = useAuth()

    const handleRemove = (productId) => {
        const productIndex = props.basket.findIndex((product) => product._id === productId);
        // console.log(productIndex)
        props.onRemove(productId, productIndex);
    };
    //console.log(props.total)






    return (
        <div className="basket-grid"  >
            <div className='center'>
                <div className='header-style'> Your Basket </div>
                <div className='header-style'> TOTAL : {props.total_buy} $ </div>

                {parseFloat(props.total_buy) > 0 &&
                    <Paybutton cartitems={props.basket} />
                }
            </div>
            {!props.basket && <div>hello</div>}
            {props.basket.map((card, index) => (
                <div className="basket-list-item" key={index}>
                    <Basket_Card
                        image={card.image}
                        title={card.title}
                        description={card.description}
                        price={card.price}
                        id={card._id}
                        onRemove={handleRemove}

                    />


                </div>


            ))}
        </div>
    )
}

export default Basketlist