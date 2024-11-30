import React, { useState } from 'react';
import { login } from '../../../api/userRoutes';
import { useGlobalData } from '../../../global';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function LoginPage() {

    // feito com base em : https://clerk.com/blog/building-a-react-login-page-template

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [resultLogin, setResultLogin] = useState('');

    const { globalData, setGlobalData } = useGlobalData(); 
    const navigate = useNavigate();

    const onButtonClick = async () => {
        // Set initial error values to empty
        setEmailError('');
        setPasswordError('');

        // Check if the user has entered both fields correctly
        if ('' === email) {
            setEmailError('Por favor, insira seu email');
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Por favor, insira um email valido');
            return;
        }

        if ('' === password) {
            setPasswordError('Por favor, insira sua senha');
            return;
        }

        // TODO : Adicionar validação na senha
        // if (password.length < 7) {
        //     setPasswordError('A senha deve ter 8 ou mais caracteres');
        //     return;
        // }

        login({
            email: email,
            password: password
        })
        .then( res => {
            // Email e password ok, usuário cadastrado e logado com sucesso :
            const user = {
                token: res.data.token, 
                id: res.data.user.id, 
                name: res.data.user.name,
                role: res.data.user.role
            };
            
            localStorage.setItem('user', JSON.stringify(user));
            setGlobalData(user);

            navigate('/');

        })
        .catch( err => {
            // Email e password ok, mas usuário não cadastrado : 
            
            if ( err.status != 500 ) {
                setResultLogin(
                    <label className='fail__login'>
                        Senha ou email inválidos
                    </label>
                )
            } else {
                setResultLogin(
                    <label className='fail__login'>
                        Ocorreu um erro, desculpe o transtorno - por favor tente novamente em instantes.
                    </label>
                )
            }


        });
        
    }

    return (
        <div className="login__container">

            <div className='title__area'>
                <div>Login</div>
            </div>

            <div className='input__area'>
                <input
                    value={email}
                    placeholder="Insira seu email aqui"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className='inputBox'
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            
            <div className='input__area'>
                <input
                    value={password}
                    type='password'
                    placeholder="Insira sua senha aqui"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className='inputBox'
                />
                <label className="errorLabel">{passwordError}</label>
            </div>

            <div className='button__area'>
                <input 
                    className='inputButton' 
                    type="button" 
                    onClick={onButtonClick} 
                    value={'Log in'}/>
            </div>

            <div className="result__area">
                {resultLogin}
            </div>

            <div className="register__user__link">
                Não tem conta? <Link to="/register">Clique aqui para criar a sua agora!</Link>
            </div>

        </div>
    );
}

export default LoginPage;