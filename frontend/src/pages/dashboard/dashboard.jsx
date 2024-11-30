// src/components/Dashboard.js
import { useState, useEffect } from 'react';

import { FaUsers, FaPaw, FaHeart } from 'react-icons/fa';
import './dashboard.css';
import UserList from "../../components/user-list/user-list";
import AdoptionForm from "../../components/adoption-form/adoption-form";
import PetList from "../../components/pet-list/pet-list"; // Importando o novo componente
import Logo from '../../components/logo/logo';
import { getUsers } from '../../api/userRoutes';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('logo'); // 'logo', 'users', 'pets', 'adoptions'
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchName, setSearchName] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await getUsers(10, (page - 1) * 10, searchName);
      console.log('Response:', response.data);
      setUsers(response.data);
      setTotalUsers(response.data.length);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchName]);

  const handleSearch = () => {
    setSearchName(searchTerm);
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <ul>
          <li className={selectedTab === 'users' ? 'active' : ''} onClick={() => setSelectedTab('users')}>
            <FaUsers className="icon" />
            Usuários
          </li>
          <li className={selectedTab === 'pets' ? 'active' : ''} onClick={() => setSelectedTab('pets')}>
            <FaPaw className="icon" />
            Pets
          </li>
          <li className={selectedTab === 'adoptions' ? 'active' : ''} onClick={() => setSelectedTab('adoptions')}>
            <FaHeart className="icon" />
            Adoções
          </li>
        </ul>
      </nav>

      <div className="main-content">
        {selectedTab === 'logo' && <Logo />}
        {selectedTab === 'users' && (
          <>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar usuário por nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Buscar</button>
            </div>
            <UserList users={users} />
            <div className="pagination">
              <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Anterior</button>
              <span>{page}</span>
              <button onClick={() => setPage(page < Math.ceil(totalUsers / 10) ? page + 1 : page)}>Próximo</button>
            </div>
          </>
        )}
        {selectedTab === 'pets' && <PetList />}
        {selectedTab === 'adoptions' && <AdoptionForm />}
      </div>
    </div>
  );
};

export default Dashboard;