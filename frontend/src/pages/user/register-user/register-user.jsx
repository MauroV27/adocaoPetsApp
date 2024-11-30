import React, { useState } from 'react';
import { useGlobalData } from '../../../global';
import { singup } from '../../../api/userRoutes';
import { useNavigate } from 'react-router-dom';
import './register-user.css';

const RegisterUserPage = () => {

    const { globalData, setGlobalData } = useGlobalData(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO : Adicionar validação na senha
        if ( formData.password != formData.confirmPassword ){
            alert("Diferença entre a senha e a senha de confirmação.\nÉ necessário que as duas possuam o mesmo valor para finalizar o cadastro!");
            return;
        };

        const userBodyToCreate = {
            'name' : formData.fullName, 
            'email' : formData.email, 
            'phone' : formData.phone, 
            'address' : formData.address, 
            'password' : formData.password
        };

        await singup(userBodyToCreate)
        .then( resp => {

            if ( resp.status == 201 ){
                alert("Conta criada com sucesso!\nEfetue o login para usar o sistema.")
                navigate('/login');
                return;
            }

            if ( resp.status == 500 ){
                const problem = resp.data.error.meta.target;
                alert(`Cadastro não pode ser efetuado, o valor de ${problem[0]} = ${userBodyToCreate[problem[0]]} já está sendo utilizado por outra conta.`);
                return;
            }

        })
        .catch( err => {
            const problem = err.response.data.error.meta.target;
            alert(`Cadastro não pode ser efetuado, o valor de ${problem[0]} = ${userBodyToCreate[problem[0]]} já está sendo utilizado por outra conta.`);
            
        });



    };

    return (
        <div className="registration__container">
            
            <h2 className='title__page'>Criar conta</h2>
            
            <form onSubmit={handleSubmit} className="registration__form">
                <label htmlFor="fullName">Nome completo:</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    required
                />

                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite seu email"
                    required
                />

                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Digite seu senha"
                    required
                />

                <label htmlFor="confirmPassword">Confirme sua senha:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme a senha acima"
                    required
                />

                <label htmlFor="phone">Telefone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Digite seu telefone"
                    required
                />

                <label htmlFor="address">Endereço:</label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Digite seu endereço"
                    rows="3"
                    required
                />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default RegisterUserPage;
