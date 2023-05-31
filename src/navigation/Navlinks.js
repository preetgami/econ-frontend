

import React, { useContext } from "react";

import { NavLink } from "react-router-dom"
import "./Navlinks.css";
import cart from "../images/cart.png"

import { Authcontex } from "../shared/context/auth-context";
export default function Navlinks(props) {
    const auth = useContext(Authcontex)
    //console.log(auth.isLoggedIn, "here")
    /*{auth.isLoggedIn &&
                    <li>
                        <NavLink to={`${auth.userId}/checkout`} >Checkout</NavLink>
                    </li>
                }

    */
    return (
        <div className="nav-container">


            <ul className="nav-links">

                <li>
                    <NavLink to="/" exact={"true"}>
                        ALL Products
                    </NavLink>
                </li>
                {auth.isLoggedIn &&
                    <li>


                        <NavLink to={`${auth.userId}/basket`} className="basket-title">

                            <span className="baskettext">Basket  </span>
                            <img src={cart} className="cart-icon" /> </NavLink>
                    </li>
                }

                <li>
                    <NavLink to="/about" >About</NavLink>
                </li>
                {!auth.isLoggedIn &&

                    <li>
                        <NavLink to="/auth" >Authenticate</NavLink>
                    </li>
                }
                {auth.isLoggedIn &&
                    <li><button className="btn" onClick={auth.logout}>Log out</button></li>}
            </ul>
        </div>


    );
}
