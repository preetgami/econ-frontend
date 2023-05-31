import { createContext } from "react";

export const Authcontex = createContext({
    isLoggedIn: false,
    userId: null,
    login: () => { },
    total: 0,
    logout: () => { },
    token: null


})
//write again
