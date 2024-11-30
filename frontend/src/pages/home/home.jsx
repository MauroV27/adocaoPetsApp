import PetCardComponent from "../../components/pet-card/pet-card";
import { FaPaw } from "react-icons/fa";
import "./home.css";
import { useState, useEffect } from "react";
import { getPets } from "../../api/petRoutes";

import bannerImage from '../../assets/banner-image-home.jpg';

function HomePageComponent() {

    const [listPets, setListPets] = useState([]);

    const loadPets = async () => {
        const resp = await getPets(6, 0)
            .then( resp => {
                return resp;
            }).catch( error => {
                return {
                    message : error.message,
                    data : [],
                    status : error.status
                };
            });

        setListPets( [... await resp.data] );
    };

    useEffect( () => {
        loadPets();
    }, []); 

    return (
        <div className="home__container">
            
            <div className="section__container hero__container">
                <div className="hero__content">
                    <h1>Bem vindo(a) a <span className="title__hero__emphasis">Adoção Tech</span></h1>
                    <p>Conectando pessoas com adoráveis pets</p>
                    <button className="hero__button">Saiba Mais</button>
                </div>
                <div className="hero__image">
                    <img
                        src={bannerImage}
                        alt="Imagem da Hero"
                    />
                </div>
            </div>

            <div className="section__container adoption__benefits__container">
                <h2>Benefícios da Adoção</h2>
                <ul>
                    <li>
                        <FaPaw className="li-icon__style" />
                        <span>Proporciona um lar seguro e amoroso para animais resgatados</span>
                    </li>
                    <li>
                        <FaPaw className="li-icon__style" />
                        <span>Reduz o número de animais abandonados e em abrigos</span>
                    </li>
                    <li>
                        <FaPaw className="li-icon__style" />
                        <span>Enriquece a vida da família com companheirismo e lealdade</span>
                    </li>
                    <li>
                        <FaPaw className="li-icon__style" />
                        <span>Promove a saúde mental e o bem-estar através da interação com os animais</span>
                    </li> 
                </ul>
            </div>

            <div className="section__container adoption__list__container">

                <h2 className="adoption__pets__list">
                    Lista de pets para adoção
                </h2>

                <div className="card-grid grid-3x2">
                    {listPets.map(pet => (
                        <PetCardComponent 
                            key={pet.id} 
                            pet={{...pet, link: "/"}}
                            />
                    ))}
                </div>
            </div>


        </div>
    );
}

export default HomePageComponent;