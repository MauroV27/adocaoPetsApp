import React, { useState, useEffect } from "react";
import PetCardComponent from "../../components/pet-card/pet-card";
import FilterMenu from "../../components/filter-menu/filter-menu"; // Importando o componente FilterMenu
import "./pet-list.css";
import { getPets, createPets } from "../../api/petRoutes"; // Importando a função getPets


const PetList = () => {
  const [listPets, setListPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    size: '',
    personality: '',
    gender: '',
    specie: '',
    status: 'AVAILABLE'
  });
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    specie: '',
    dob: '',
    description: '',
    breed: '',
    gender: 'UNDEFINED',
    size: 'UNDEFINED',
    personality: 'UNDEFINED',
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getPets(10, 0, filters.size, filters.personality, filters.gender, filters.specie, filters.status);
        setListPets(response.data);
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [filters]);

  const handleApplyFilters = (appliedFilters) => {
    setLoading(true);
    setFilters({ ...filters, ...appliedFilters });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };


  const handleCreatePet = async () => {
    try {
      await createPets(newPet);
      alert('Pet cadastrado com sucesso!');
      setShowForm(false);
      fetchPets();
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      alert('Erro ao cadastrar pet!');
    }
  };

  return (
    <div>
      {!showForm && (
        <div className="pet-list__container">
          <button onClick={() => setShowForm(true)}>Cadastrar Novo Pet</button>
          <div className="list__pets__section">
            <h2 className="list__pets__section__title">Pets disponíveis para adoção</h2>

            {loading ? (
              <p>Carregando...</p>
            ) : (
              listPets.length === 0 ? (
                <p>Nenhum pet foi encontrado com essas características</p>
              ) : (
                <div className="card__list__pets__section">
                  {listPets.map((pet, index) => (
                    <PetCardComponent 
                      key={index}
                      pet={{ ...pet, link: "/" }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}
      {showForm && (
        <div className="pet-form">
          <h2>Cadastrar Novo Pet</h2>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={newPet.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="specie"
            placeholder="Espécie"
            value={newPet.specie}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Data de Nascimento"
            value={newPet.dob}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={newPet.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="breed"
            placeholder="Raça"
            value={newPet.breed}
            onChange={handleInputChange}
          />
          <select name="gender" value={newPet.gender} onChange={handleInputChange}>
            <option value="UNDEFINED">Indefinido</option>
            <option value="MALE">Macho</option>
            <option value="FEMALE">Fêmea</option>
          </select>
          <select name="size" value={newPet.size} onChange={handleInputChange}>
            <option value="UNDEFINED">Indefinido</option>
            <option value="SMALL">Pequeno</option>
            <option value="MEDIUM">Médio</option>
            <option value="BIGGER">Grande</option>
          </select>
          <select name="personality" value={newPet.personality} onChange={handleInputChange}>
            <option value="UNDEFINED">Indefinido</option>
            <option value="CALM">Calmo</option>
            <option value="PLAYFUL">Brincalhão</option>
            <option value="INDEPENDENT">Independente</option>
          </select>
          <button onClick={handleCreatePet}>Cadastrar</button>
          <button onClick={() => setShowForm(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default PetList;