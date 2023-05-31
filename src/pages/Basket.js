import React from 'react'
import { useHttpClient } from '../shared/http-hook';
import { useEffect, useState } from 'react';
import ErrorModal from '../components_ui/ErrorModal';
import { Authcontex } from '../shared/context/auth-context'
import { useContext } from 'react'
import Basketlist from '../Basket/Basketlist';
function Basket() {


    const { isloading, error, sendRequest, clearError } = useHttpClient()
    const auth = useContext(Authcontex)
    const [total, settotal] = useState()

    const [loadedporducts, setloaded] = useState()
    useEffect(() => {
        const fetch_new_products = async () => {
            try {
                const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/products/user/${auth.userId}`)
                setloaded(response.basket)
                settotal(response.total)


            } catch (err) {

            }
        }

        fetch_new_products()


    }, [sendRequest])
    const removeFromBasket = async (productId, index) => {
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/products/user/${auth.userId}/basket/${productId}`, 'DELETE');
            setloaded(prevProducts => {
                const updatedProducts = [...prevProducts];
                updatedProducts.splice(index, 1);

                return updatedProducts;
            })
            settotal(response.total)

        } catch (err) {

        }
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isloading && loadedporducts && (

                <div className='background2'>
                    <div className='padding'></div>
                    <Basketlist basket={loadedporducts} total_buy={total} onRemove={removeFromBasket} />
                </div >)}
        </React.Fragment>
    )
}
export default Basket