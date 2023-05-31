import React, { useCallback, useContext } from 'react'
import "./products.css"
import CardList from '../card/CardList';
import { useHttpClient } from '../shared/http-hook';
import { useEffect, useState } from 'react';
import ErrorModal from '../components_ui/ErrorModal';
import { Authcontex } from '../shared/context/auth-context';


function Allproducts(props) {
    const auth = useContext(Authcontex)
    const { isloading, error, sendRequest, clearError } = useHttpClient()
    const [loadedporducts, setloaded] = useState()
    const user = 1

    useEffect(() => {
        const fetch_products = async () => {
            try {
                const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/products")
                setloaded(response.products)

            } catch (err) {

            }
        }
        fetch_products()

    }, [])
    //console.log(loadedporducts)

    // Add more products here...


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isloading && loadedporducts && (

                <div className='bg'>

                    <div className='padding'></div>
                    <CardList cards={loadedporducts} />

                </div >)}
        </React.Fragment>
    )
}

export default Allproducts