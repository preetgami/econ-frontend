import React from 'react'
import "./card.css"
import Modal from "../Modal/Modal"
//when you hot vie me a modal opens showing you the product 
import { useState } from 'react'
import { Authcontex } from '../shared/context/auth-context'
import { useHttpClient } from '../shared/http-hook'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
function Card(props) {
    const [opendescription, setopendescription] = useState(false)
    const { isloading, error, sendRequest, clearError } = useHttpClient()
    const auth = useContext(Authcontex)

    const userId = useParams().userId
    //console.log(userId)

    const openDesc = () => setopendescription(true);
    const closeDesc = () => setopendescription(false);

    const [showCart, setshowCart] = useState(false)
    const w = <div className="card" >



        <div className='flex'>
            <img src={props.image} alt="Product Image" className="card-image" />
            <div className="card-content">

                <h2 className="card-title">{props.title}</h2>
                <p className="card-text">{props.description}</p>
                <div className="card-price">${props.price}</div>

            </div>
        </div>
    </div >
    //console.log(props)






    const openCart = () => setshowCart(true);
    const confirmOrder = async event => {
        event.preventDefault();
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/products/user/${auth.userId}/basket/${props.id}`, "POST")
            setshowCart(false);

        } catch (err) {

        }

        if (!error) {
            return <div className="center"><Card>out of stock</Card></div>;
        }

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
        onCancel={confirmOrder}
        header={"Cart confirmation"}

        footer={<button className="card-button" onClick={confirmOrder}>Confirm</button>
        }
    >

        <div className='modal-content'>
            {"Are you sure?"}
        </div>
    </Modal>

    return (<React.Fragment>
        {opendescription && content}
        {showCart && cart}


        <div className="card" >



            <div className='flex'>
                <img src={props.image} alt="Product Image" className="card-image" />
                <div className="card-content">

                    <h2 className="card-title">{props.title}</h2>
                    <p className="card-text">{props.description}</p>
                    <div className="card-price">${props.price}</div>
                    <button className="card-button2" onClick={openDesc}>View me</button>
                    <button className="card-button" onClick={openCart} disabled={!auth.isLoggedIn}  >Add to Cart</button>
                </div>
            </div>
        </div>
    </React.Fragment>

    )
}

export default Card