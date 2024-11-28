import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPetById } from '../../api/petRoutes';
import './pet-page.css';

function PetDetailPage() {

    const { id } = useParams(); // Pega o ID da URL
    const [ pet, setPet ] = useState({});

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
        
        // Placeholder images to represent pet specie
        const placeHolderImage = {
            "CAT" : "https://catfriendly.com/wp-content/uploads/2016/11/Cat-Lying-Down-Red-coloring-Istock-300x300.jpg",
            "DOG" : "https://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg",
            "BIRD" : "https://abcbirds.org/wp-content/uploads/2022/04/Eastern-Bluebird-female.-Photo-by-Steve-BylandShutterstock..png",
            "RABBIT" : "https://cdn.roysfarm.com/wp-content/uploads/Rabbit.jpg",
            "UNDEFINED" : "https://via.placeholder.com/300",
        }

        const specie = data.specie;
        data.image = specie in placeHolderImage ? (placeHolderImage[specie]) : (placeHolderImage["UNDEFINED"]);
        
        setPet( data );
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
                        <li><strong>Data de Nascimento:</strong> {pet.dob}</li>
                        <li><strong>Descrição:</strong> {pet.description}</li>
                        <li><strong>Raça:</strong> {pet.breed == null ? "UNDEFINED" : pet.breed}</li>
                        <li><strong>Gênero:</strong> {pet.gender}</li>
                        <li><strong>Status:</strong> {pet.status}</li>
                        <li><strong>Tamanho:</strong> {pet.size}</li>
                        <li><strong>Personalidade:</strong> {pet.personality}</li>
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