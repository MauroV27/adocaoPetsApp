import React, { useState, useEffect } from "react";
import { getPets, getSpecies } from '../../api/petRoutes.js';
import "./filter-menu.css";

function FilterMenuComponent({ onApplyFilters }) {
    
    // Estados para armazenar os filtros
    const [size, setSize] = useState(null);
    const [personality, setPersonality] = useState(null);
    const [gender, setGender] = useState(null);
    
    const [speciesList, setSpeciesList] = useState([]);
    const [selectedSpecie, setSelectedSpecie] = useState("");

    const loadSpeciesList = async () => {
        const listSpecies = await getSpecies()
            .then(resp => resp)
            .catch( error => {
                return null;
            });

        if ( listSpecies ){
            const data = await listSpecies.data.species;
            setSpeciesList([...data]);   
        }   

    };
    
    // Gerar a URL com os filtros aplicados
    const onGetData = async () => {
        
        const limit = 10; // Pode ajustar conforme necessário
        const offset = 0; // Inicialmente zero, pode ser ajustado para paginação
        
        const pets = await getPets(          
            limit,
            offset,
            size || '',
            personality || '',
            gender || '', 
            selectedSpecie || '' 
        ).then( resp => {
            return resp;
        }).catch( error => {
            return {
                message : error.message,
                data : [],
                status : error.status
            };
        });

        const data = await pets.data;
        return [...data];
    };

    // Chama a função de filtro automaticamente na montagem
    useEffect( () => {
        loadSpeciesList();
        const initialUrl = onGetData();
        onApplyFilters(initialUrl); // Chama a função de filtro com os valores iniciais
    }, []); // [] garante que será executado apenas na montagem


    const handleApplyFilters = () => {
        const pets = onGetData();
        onApplyFilters(pets); // Envia a URL para o componente pai
    }

    return (
        <div className="filter-menu__container">
            <h2>Filtros</h2>


            <div className="filter__list">

                {/* Filtro :: Size */}
                <div className="filter__group filter__item">
                    <label htmlFor="size">Tamanho</label>
                    <select id="size" 
                        value={size || ""} 
                        onChange={(e) => setSize(e.target.value || null)}
                    >
                        <option value="">Todos</option>
                        <option value="SMALL">Pequeno</option>
                        <option value="MEDIUM">Médio</option>
                        <option value="BIGGER">Grande</option>
                    </select>
                </div>

                {/* Filtro :: Personality */}
                <div className="filter__group filter__item">
                    <label htmlFor="personality">Personalidade</label>
                    <select
                        id="personality"
                        value={personality || ""}
                        onChange={(e) => setPersonality(e.target.value || null)}
                    >
                        <option value="">Todos</option>
                        <option value="CALM">Calmo</option>
                        <option value="PLAYFUL">Brincalhão</option>
                        <option value="INDEPENDENT">Independente</option>
                    </select>
                </div>

                {/* Filtro :: Gender */}
                <div className="filter__group filter__item">
                    <label htmlFor="gender">Gênero</label>
                    <select 
                        id="gender" 
                        value={gender || ""} 
                        onChange={(e) => setGender(e.target.value || null)}
                    >
                        <option value="">Todos</option>
                        <option value="MALE">Masculino</option>
                        <option value="FEMALE">Feminino</option>
                    </select>
                </div>

                {/* Filtro :: Specie */}
                <div className="filter__group filter__item">
                    <label htmlFor="species">Espécie</label>
                    <select 
                        id="species" 
                        value={selectedSpecie || ""} 
                        onChange={(e) => setSelectedSpecie(e.target.value || null)}
                    >
                        <option value="">Todos</option>

                        {
                            speciesList.map( (specie, index) => (
                                <option value={specie} key={index}>{specie.toLowerCase()}</option>
                            ))
                        }

                    </select>
                </div>

                {/* Botão para aplicar os filtros */}
                <button 
                    onClick={handleApplyFilters} 
                    className="apply__filters filter__item"
                >
                    Aplicar Filtros
                </button>


            </div>   

        </div>
    );
}

export default FilterMenuComponent;