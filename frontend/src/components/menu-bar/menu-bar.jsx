import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalData } from '../../global';
import './menu-bar.css';

function MenuBarComponent() {

    const [userLogged, setUserLogged] = useState(false);
    const [userRole, setUserRole] = useState("USER");
    
    const { globalData, setGlobalData } = useGlobalData();

    const getDataFromGlocalComponent = async () => {

        setUserLogged( await globalData.token ? true : false );
        setUserRole( await globalData.role || "USER" );

    };

    getDataFromGlocalComponent();

    return ( 
        <nav className="menu-bar__container">

            <ul className='links__menu-bar'>
                <li className='btn-to'>
                    <Link to="/">Início</Link >
                </li>
                <li className='btn-to'>
                    <Link to="/about">Sobre</Link >
                </li>

                { userRole == "ADMIN" ? (
                    <li className='btn-to'>
                        <Link to="/dashbord">Dashbord</Link >
                    </li>
                ) : (<></>)}
            </ul>

            <ul className='user__access__menu-bar'>
                {
                    !userLogged ? (
                        <li className='btn-to'>
                            <Link to="/login">Entrar</Link >
                        </li>
                    ) : (
                        <li className='btn-to'>
                            <Link to="/">Perfil</Link >
                        </li>
                    )
                }
                
                <li className='btn-to btn-emphasis'><Link to="/adoption">Adote</Link ></li>
            
            </ul>

        </nav>
    );
}

export default MenuBarComponent;

