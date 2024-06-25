import { createContext, useEffect } from "react";
import ProductApi from './api/ProductApi';
import { useState } from "react";
import axios from "axios";
import UserApi from "./api/UserApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        try {
            const res = await axios.get('https://my-shio-app.onrender.com/user/refresh_token'); // Correct HTTP method
            console.log('Response:', res); // Log the full response for debugging
            setToken(res.data.accessToken); // Ensure this matches the response structure
            console.log('Token:', res.data.accessToken); // Log the token value
        } catch (error) {
            console.error('Error refreshing token:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductApi(),
        userAPI:UserApi(token)
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
