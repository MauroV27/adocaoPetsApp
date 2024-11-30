// src/components/UserList.js
import React from 'react';

const UserList = ({ users }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Cadastro</th>
          <th>Adoção</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          console.log(user); // Adiciona o console.log aqui
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{Array.isArray(user.Adoption) && user.Adoption.length > 0 ? 'Sim' : 'Não'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
