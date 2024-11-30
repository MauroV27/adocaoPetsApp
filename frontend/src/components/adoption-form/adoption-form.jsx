import React, { useState, useEffect } from 'react';
import { createAdoption } from '../../api/adoptRoutes';
import { getUsers } from '../../api/userRoutes';
import './adoption-Form.css'; // Importando o arquivo CSS

const AdoptionForm = () => {
  const [userId, setUserId] = useState('');
  const [petId, setPetId] = useState('');
  const [userName, setUserName] = useState('');
  const [userOptions, setUserOptions] = useState([]);

  const handleAdopt = async () => {
    if (!userId || !petId) {
      alert('Por favor, selecione um usuário e insira o ID do pet.');
      return;
    }

    try {
      await createAdoption({ userId, petId });
      alert('Adoção oficializada com sucesso!');
    } catch (error) {
      console.error('Erro ao oficializar adoção:', error);
      alert('Erro ao oficializar adoção!');
    }
  };

  const fetchUsers = async (name) => {
    try {
      const response = await getUsers(10, 0, name);
      setUserOptions(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    if (userName) {
      fetchUsers(userName);
    } else {
      setUserOptions([]);
    }
  }, [userName]);

  return (
    <div className="adoption-form">
      <h2 className="form-title">Cadastrar Adoção</h2>
      <input
        type="text"
        placeholder="Nome do Usuário"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="form-input"
      />
      {userOptions.length > 0 && (
        <ul className="options-list">
          {userOptions.map((user) => (
            <li key={user.id} onClick={() => { setUserId(user.id); setUserName(user.name); setUserOptions([]); }} className="options-item">
              {user.name}
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="ID do Pet"
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
        className="form-input"
      />
      <button onClick={handleAdopt} className="btn-primary">Adotar</button>
    </div>
  );
};

export default AdoptionForm;