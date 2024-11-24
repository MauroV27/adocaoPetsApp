import React, { useState, useEffect } from "react";
import "./filter-menu.css";

function FilterMenuComponent({ onApplyFilters }) {
    
    // Estados para armazenar os filtros
    const [size, setSize] = useState(null);
    const [personality, setPersonality] = useState(null);
    const [gender, setGender] = useState(null);

    
    // Gerar a URL com os filtros aplicados
    const onGetData = () => {
        
        const baseURL = "https://example.com/api/pets";
        const limit = 10; // Pode ajustar conforme necessário
        const offset = 0; // Inicialmente zero, pode ser ajustado para paginação

        const params = new URLSearchParams({
            limit,
            offset,
            size: size || "UNDEFINED",
            personality: personality || "UNDEFINED",
            gender: gender || "UNDEFINED",
        });

        const url = `${baseURL}?${params.toString()}`;  
        
        const pets = [
            { id: 1,    name: "Test 1",     description: 'Descrição do Card 1',     link: "/pets", specie: "CAT", gender: "MALE"},
            { id: 2,    name: "Test 2",     description: 'Descrição do Card 2',     link: "/pets", specie: "DOG", gender: "FEMALE"},
            { id: 3,    name: "Test 3",     description: 'Descrição do Card 3',     link: "/pets", specie: "CAT", gender: "MALE"},
            { id: 4,    name: "Test 4",     description: 'Descrição do Card 4',     link: "/pets", specie: "RABBIT", gender: "MALE"},
            { id: 5,    name: "Test 5",     description: 'Descrição do Card 5',     link: "/pets", specie: "CAT", gender: "FEMALE"},
            { id: 6,    name: "Test 6",     description: 'Descrição do Card 6',     link: "/pets", specie: "DOG", gender: "MALE"},
            { id: 7,    name: "Test 7",     description: 'Descrição do Card 3',     link: "/pets", specie: "DOG", gender: "MALE"},
            { id: 8,    name: "Test 8",     description: 'Descrição do Card 4',     link: "/pets", specie: "SNAKE", gender: "UNDEFINED"},
            { id: 9,    name: "Test 9",     description: 'Descrição do Card 5',     link: "/pets", specie: "DOG", gender: "MALE"},
            { id: 10,   name: "Test a",      description: 'Descrição do Card 6',     link: "/pets", specie: "DOG", gender: "MALE"},
            { id: 11,   name: "Test b",      description: 'Descrição do Card 6',     link: "/pets", specie: "BIRD", gender: "UNDEFINED"},
            { id: 12,   name: "Test c",      description: 'Descrição do Card 6',     link: "/pets", specie: "CAT", gender: "FEMALE"},
        ];

        return pets;

    };

    // Chama a função de filtro automaticamente na montagem
    useEffect(() => {
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