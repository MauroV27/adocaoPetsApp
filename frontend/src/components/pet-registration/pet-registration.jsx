import React, { useState } from 'react';
import './PetRegistration.css';

const PetRegistration = () => {
  const [formData, setFormData] = useState({
    petName: '',
    species: '',
    birthDate: '',
    description: '',
    status: 'disponível',
  });

  const [pets, setPets] = useState([]); // Lista de pets cadastrados

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPets([...pets, formData]); // Adiciona o novo pet à lista
    alert(`Pet cadastrado com sucesso! Nome: ${formData.petName}`);
    setFormData({
      petName: '',
      species: '',
      birthDate: '',
      description: '',
      status: 'disponível',
    }); // Limpar o formulário
  };

  const handleAdopt = (index) => {
    const updatedPets = pets.map((pet, i) =>
      i === index ? { ...pet, status: 'adotado' } : pet
    );
    setPets(updatedPets);
    alert(`O pet ${pets[index].petName} foi adotado com sucesso!`);
  };

  return (
    <div className="pet-registration-container">
      <h2>Cadastro de Pets</h2>
      <form onSubmit={handleSubmit} className="pet-registration-form">
        <label htmlFor="petName">Nome do Pet:</label>
        <input
          type="text"
          id="petName"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          placeholder="Digite o nome do pet"
          required
        />
        
        <label htmlFor="species">Espécie:</label>
        <input
          type="text"
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          placeholder="Ex.: Cachorro, Gato, Coelho"
          required
        />
        
        <label htmlFor="birthDate">Data de Nascimento:</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ex.: Muito brincalhão, precisa de cuidados especiais..."
          rows="3"
          required
        />
        
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="disponível">Disponível</option>
          <option value="adotado">Adotado</option>
        </select>
        
        <button type="submit">Cadastrar Pet</button>
      </form>

      <div className="pet-list">
        <h3>Pets Cadastrados</h3>
        {pets.length === 0 ? (
          <p>Nenhum pet cadastrado ainda.</p>
        ) : (
          <ul>
            {pets.map((pet, index) => (
              <li key={index} className="pet-item">
                <p><strong>Nome:</strong> {pet.petName}</p>
                <p><strong>Espécie:</strong> {pet.species}</p>
                <p><strong>Data de Nascimento:</strong> {pet.birthDate}</p>
                <p><strong>Descrição:</strong> {pet.description}</p>
                <p><strong>Status:</strong> {pet.status}</p>
                {pet.status === 'disponível' && (
                  <button onClick={() => handleAdopt(index)}>Adotar</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PetRegistration;
