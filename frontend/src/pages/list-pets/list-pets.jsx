import React, { useState } from "react";
import FilterMenuComponent from "../../components/filter-menu/filter-menu";
import PetCardComponent from "../../components/pet-card/pet-card";
import "./list-pets.css";

function ListPetsPage() {

    const [listPets, setListPets] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadPets = async (listPetsFromQuery) => {
        setListPets([...listPetsFromQuery]);
        setLoading(true);
    };

    return ( 
        <div className="list-pets__container">
        
            <div className="filter-pets__section">
                <FilterMenuComponent onApplyFilters={loadPets}/>
            </div>
        
            <div className="list__pets__section">

                <h2 className="list__pets__section__title">Pets disponiveis para adoção</h2>

                {loading ? (
 
                    <div className="card__list__pets__section">
                    {
                        listPets.map((pet, index) => (
                            <PetCardComponent 
                                key={index}
                                pet={{ ...pet, link: "/" }}
                            />                    
                        ))
                    }
                    </div>
                ):( 
                    <p>Carregando...</p>
                )}

                

            </div>

        </div>
    );
}

export default ListPetsPage;