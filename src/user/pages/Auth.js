import React from 'react'
import "./Auth.css"
import { useState } from 'react'
import { useContext } from 'react'
import { Authcontex } from '../../shared/context/auth-context'
import Card_main from '../../components_ui/Card_main'
import Input from '../../components_ui/input'
import Button from "../../components_ui/button"
import ErrorModal from "../../components_ui/ErrorModal"
import { useForm } from "../../shared/context/form-hook"
import { useHttpClient } from "../../shared/http-hook"

function Authenticate() {
    const { isloading, error, sendRequest, clearError } = useHttpClient()

    const auth = useContext(Authcontex)
    const [formstate, inputHandler, setformdata] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    })
    const [islogin, setIslogin] = useState(false)
    const switchModeHandler = () => {
        if (!islogin) {
            setformdata(
                {
                    ...formstate.inputs,
                    name: undefined
                },
                formstate.inputs.email.isValid && formstate.inputs.password.isValid
            );
        } else {
            setformdata(
                {
                    ...formstate.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIslogin(prevMode => !prevMode);
    };

    const authsubmithandler = async event => {
        event.preventDefault();

        if (islogin) {

            try {
                const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/login", 'POST', JSON.stringify({
                    email: formstate.inputs.email.value,
                    password: formstate.inputs.password.value
                }),
                    {

                        'Content-Type': 'application/json'
                    },

                );
                auth.login(response.userId, response.token)

            } catch (err) {

            }




        } else {

            try {
                const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/signup", 'POST',
                    JSON.stringify({
                        name: formstate.inputs.name.value,
                        email: formstate.inputs.email.value,
                        password: formstate.inputs.password.value
                    }), {
                    'Content-Type': 'application/json'
                }
                )
                auth.login(response.userId, response.token)
            } catch (err) {

            }





        }

    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card_main className="authentication">
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authsubmithandler}>
                    {!islogin && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            errorText="Please enter a name."
                            onInput={inputHandler}
                        />
                    )}
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-Mail"
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        errorText="Please enter a valid password, at least 6 characters."
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formstate.isValid}>
                        {islogin ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {islogin ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card_main>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div><div>.</div>
            <div>.</div><div>.</div>
            <div>.</div><div>.</div>
            <div>.</div><div>.</div>
            <div>.</div><div>.</div>
            <div>.</div><div>.</div>
            <div>.</div><div>.</div>
            <div>.</div><div>.</div>
            <div>.</div>
            <div></div>
            <div></div>
            <div></div>
        </React.Fragment>
    );
}

export default Authenticate