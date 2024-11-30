import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalData } from '../../../global';
import { getUserById } from '../../../api/userRoutes';
import './profile.css';


function UserProfilePage() {

    const [ user, setUser] = useState({
        id: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        role: ''
    });

    const { globalData, setGlobalData } = useGlobalData(); 
    const navigate = useNavigate();

    const getUserData = async () => {

        const id = await globalData.id;
        const token = await globalData.token;

        await getUserById(id, {headers: {
            'authorization' : token,
        }})
        .then( resp => {
            setUser({...resp.data.data});
        })
        .catch( err => {
            // Se não encontrar o usuário ou occorrer algum outro tipo de erro volta para a home
            // navigate('/'); 
            console.log(err)
        });
    }

    useEffect( () => {
        getUserData();        
    }, []);

    const handleLogoutUser = () => {
        const conf = confirm("Deseja sair da conta?");

        if (conf){
            setGlobalData({});
            localStorage.removeItem('user'); // Remove user
            
            navigate('/');
        }
    }


    return (
        <div className="user-profile__container">

            <h1>Perfil do Usuário</h1>

            <div className="user__info">
                <p><strong>Nome:</strong> {user.name}</p>
                <p><strong>Endereço:</strong> {user.address}</p>
                <p><strong>Telefone:</strong> {user.phone}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <button 
                className="logout__button"
                onClick={handleLogoutUser} 
                >
                    Logout
                </button>

        </div>
    );
}

export default UserProfilePage;