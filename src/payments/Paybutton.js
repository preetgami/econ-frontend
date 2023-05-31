import axios from "axios"
import React, { useContext } from 'react'
import { Authcontex } from "../shared/context/auth-context"
import "../Basket/Basket_card.css"
function Paybutton({ cartitems }) {
    const auth = useContext(Authcontex)
    const handlecheckout = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/stripe/create-checkout-session", {
            cartitems,
            userId: auth.userId
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.message))
    }
    return (
        <>
            <button className="basket-button3" onClick={() => handlecheckout()}>Check out</button>
        </>)
}

export default Paybutton