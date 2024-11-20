import CardComponent from "../../components/card/card";
import "./home.css";

function HomePageComponent() {

    const cards = [
        { id: 1, image: 'https://via.placeholder.com/300', title: 'Card 1', description: 'Descrição do Card 1', link: "/pets" },
        { id: 2, image: 'https://via.placeholder.com/300', title: 'Card 2', description: 'Descrição do Card 2', link: "/pets" },
        { id: 3, image: 'https://via.placeholder.com/300', title: 'Card 3', description: 'Descrição do Card 3', link: "/pets" },
        { id: 4, image: 'https://via.placeholder.com/300', title: 'Card 4', description: 'Descrição do Card 4', link: "/pets" },
        { id: 5, image: 'https://via.placeholder.com/300', title: 'Card 5', description: 'Descrição do Card 5', link: "/pets" },
        { id: 6, image: 'https://via.placeholder.com/300', title: 'Card 6', description: 'Descrição do Card 6', link: "/pets" },
    ];

    return (
        <div className="home__container">
            
            <div className="hero__container section__container">
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

            <div className="adoption__benefits__container section__container">
                <h2>Benefícios da Adoção</h2>
                <ul>
                    <li>Proporciona um lar seguro e amoroso para animais resgatados</li>
                    <li>Reduz o número de animais abandonados e em abrigos</li>
                    <li>Enriquece a vida da família com companheirismo e lealdade</li>
                    <li>Promove a saúde mental e o bem-estar através da interação com os animais</li> 
                </ul>
            </div>

            <div className="section__container adoption__list__container">

                <h2 className="adoption__pets__list">
                    Lista de pets para adoção
                </h2>

                <div className="card-grid grid-3x2">
                    {cards.map(card => (
                        <CardComponent 
                            key={card.id} 
                            image={card.image} 
                            title={card.title} 
                            description={card.description} 
                            link="/"
                            />
                    ))}
                </div>
            </div>


        </div>
    );
}

export default HomePageComponent;