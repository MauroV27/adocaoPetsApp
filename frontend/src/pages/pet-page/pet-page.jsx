import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetById } from '../../api/petRoutes';
import { IoIosInformationCircleOutline } from "react-icons/io";
import './pet-page.css';
import { getSpecieData, getGenderDescription, getPetStatus, getPetSize, getPetPersonality } from '../../constant/petClassification';

function PetDetailPage() {

    const { id } = useParams(); // Pega o ID da URL
    const [ pet, setPet ] = useState({});

    function calculateAge(dateString) {
        const birthDate = new Date(dateString);
        const today = new Date();
    
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
    
        // Ajusta se o mês atual for anterior ao mês de nascimento
        if (months < 0) {
            years--;
            months += 12;
        }
    
        return {
            years,
            months
        };
    }   

    const loadPetData = async () => {
        const resp = await getPetById(id)
            .then( res => {
                return res;
            })
            .catch( error => {
                return null;
            });

        if ( resp == null ){
            setPet(null);
            return;
        }

        const data = await resp.data;
        const specie = data.specie;
        
        const specieDescription = getSpecieData(specie);
        const age = calculateAge(data.dob);

        setPet( {...data, 
            specie: specieDescription.description,
            image: specieDescription.image, 
            age: `${age.years} anos e ${age.months} meses`,
            dob: new Date(data.dob).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        } );
    };

    useEffect( () => {
        loadPetData();        
    }, []);

    return (
        
        pet ? (
            <div className="pet-detail-page__container">
                <div className="pet__image pet-detail__item">
                    <img src={pet.image} alt="" />
                </div>

                <div className="pet__info pet-detail__item">
                    <h1>{pet.name}</h1>
                    <ul>
                        {/* <li><strong>ID:</strong> {pet.id}</li> */}
                        <li><strong>Espécie:</strong> {pet.specie}</li>
                        <li>
                            <strong>Idade:</strong> {pet.age} 
                            <span><IoIosInformationCircleOutline 
                                title={`${pet.name} nasceu no dia ${pet.dob}`}
                            /></span>
                        </li>
                        <li><strong>Descrição:</strong> {pet.description}</li>
                        <li><strong>Raça:</strong> {pet.breed == null ? "Não informada" : pet.breed}</li>
                        <li><strong>Gênero:</strong> {getGenderDescription(pet.gender)}</li>
                        <li><strong>Status:</strong> {getPetStatus(pet.status)}</li>
                        <li><strong>Tamanho:</strong> {getPetSize(pet.size)}</li>
                        <li><strong>Personalidade:</strong> {getPetPersonality(pet.personality)}</li>
                    </ul>
                </div>  

            </div>
        ) : (
            <div className="pet-detail-page__container">
                <p>Nenhum pet com o ID: {id} foi encontrado!</p>
            </div>
        )
        
    );
}

export default PetDetailPage;