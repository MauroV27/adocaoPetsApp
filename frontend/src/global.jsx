import React, { createContext, useContext, useEffect, useState } from 'react';

// Cria o contexto
const GlobalDataContext = createContext();

// Provedor do Contexto
export const GlobalDataProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState({});

    const checkLogin = () => {
        
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        // user == {}
        if (Object.keys(user).length === 0 && user.constructor === Object || user.id == undefined ){
            return;
        }

        if ( user.hasOwnProperty('token') && user.hasOwnProperty('id') ){
            setGlobalData(user);
        }
    };

    useEffect( () => {
        checkLogin();
    }, []);

    return (
        <GlobalDataContext.Provider value={{ globalData, setGlobalData }}>
            {children}
        </GlobalDataContext.Provider>
    );
};

// Hook para consumir o contexto
export const useGlobalData = () => useContext(GlobalDataContext);
