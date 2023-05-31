import React from 'react'
import { useState } from 'react'
import "./Basket_card.css"
import Modal from '../Modal/Modal'
import { Authcontex } from '../shared/context/auth-context'
import { useHttpClient } from '../shared/http-hook'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

function Basket_Card(props) {

    const [opendescription, setopendescription] = useState(false)
    const { isloading, error, sendRequest, clearError } = useHttpClient()
    const auth = useContext(Authcontex)
    const userId = useParams().userId

    const openDesc = () => setopendescription(true);
    const closeDesc = () => setopendescription(false);
    const [showCart, setshowCart] = useState(false)

    //console.log(props)






    const openCart = () => setshowCart(true);
    const confirmOrder = async event => {
        event.preventDefault();
        try {
            //const response = await sendRequest(`http://localhost:5000/api/products/user/${auth.userId}/basket/${props.id}`, "DELETE")
            props.onRemove(props.id);
            setshowCart(false);
            return <div>hello</div>
        } catch (err) {

        }

        if (!error) {
            return
        }

        setshowCart(false);

    }
    const closeCart = () => {
        setshowCart(false);

    }

    const content = <Modal
        show={opendescription}
        onCancel={closeDesc}
        header={"Description"}
        footer={<button className="card-button" onClick={closeDesc}>Close</button>}
    >

        <div className='modal-content'>

            <img src={props.image} alt="Product Image" className="card-image" />

            {props.description}
        </div>
    </Modal>

    const cart = <Modal
        show={showCart}
        onCancel={closeCart}
        header={"Cart confirmation"}

        footer={<button className="card-button" onClick={confirmOrder}>Confirm</button>
        }
    >

        <div className='modal-content'>
            {"Are you sure?"}
        </div>
    </Modal>
    //<p className="basket-text">{props.description}</p>

    return (<React.Fragment>
        {opendescription && content}
        {showCart && cart}

        <div className="basket" >



            <div className='inline'>

                <div className="basket-content">
                    <img src={props.image} alt="Product Image" className="basket-image" />
                    <h2 className="basket-title">{props.title}</h2>

                    <div className="basket-price">${props.price}</div>

                    <button className="basket-button" onClick={openCart} disabled={!auth.isLoggedIn}  >Remove from Cart</button>

                    <button className="basket-button2" onClick={openDesc}>View me</button>
                </div>
            </div>
        </div>
    </React.Fragment>

    )
}

export default Basket_Card