import React, { useState } from 'react';
import './UserRegistration.css';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cadastro realizado com sucesso! 
    Nome: ${formData.fullName}
    Email: ${formData.email}
    Telefone: ${formData.phone}
    Endereço: ${formData.address}`);
    
    setFormData({ fullName: '', email: '', phone: '', address: '' }); // Limpar o formulário
  };

  return (
    <div className="registration-container">
      <h2>Cadastro de Adotante</h2>
      <form onSubmit={handleSubmit} className="registration-form">
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

export default UserRegistration;
