import PetCardComponent from "../../components/pet-card/pet-card";
import { FaPaw } from "react-icons/fa";
import "./home.css";

function HomePageComponent() {

    const listPets = [
        { id: 1, name:"Test 1", description: 'Descrição do Card 1', link: "/pets", specie: "CAT", gender: "MALE" },
        { id: 2, name:"Test 2", description: 'Descrição do Card 2', link: "/pets", specie: "DOG", gender: "FEMALE" },
        { id: 3, name:"Test 3", description: 'Descrição do Card 3', link: "/pets", specie: "BIRD", gender: "MALE" },
        { id: 4, name:"Test 4", description: 'Descrição do Card 4', link: "/pets", specie: "CAT", gender: "FEMALE" },
        { id: 5, name:"Test 5", description: 'Descrição do Card 5', link: "/pets", specie: "DOG", gender: "MALE" },
        { id: 6, name:"Test 6", description: 'Descrição do Card 6', link: "/pets", specie: "CAT", gender: "MALE" },
    ];

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
                        src="https://via.placeholder.com/600x400"
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