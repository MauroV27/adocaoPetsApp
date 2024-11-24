import React from 'react';
import { IoMdMale, IoMdFemale, IoMdStar } from "react-icons/io";
import { PiCatFill, PiDogFill, PiBirdFill, PiRabbitFill, PiQuestionFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import './pet-card.css';
import { FaQuestion } from 'react-icons/fa';

function PetCardComponent({pet}) {

    const { image, name, gender, description, specie, link } = pet;

    const specieIcon = {
        "CAT" : <PiCatFill />,
        "DOG" : <PiDogFill />,
        "BIRD" : <PiBirdFill />,
        "RABBIT" : <PiRabbitFill />,
        "UNDEFINED" : <IoMdStar />
    }

    const specieIconDescription = {
        "CAT" : "Gato",
        "DOG" : "Cachorro",
        "BIRD" : "Pássaro",
        "RABBIT" : "Coelho",
        "UNDEFINED" : `Animal do tipo : ${specie}`
    }

    const genderIcon = {
        "FEMALE" : <IoMdFemale />,
        "MALE" : <IoMdMale />,
        "UNDEFINED" : <FaQuestion />,
    }

    const genderIconDescription = {
        "FEMALE" : "Fêmea",
        "MALE" : "Macho",
        "UNDEFINED" : "Desconhecido"
    }

    // Placeholder images to represent pet specie
    const placeHolderImage = {
        "CAT" : "https://catfriendly.com/wp-content/uploads/2016/11/Cat-Lying-Down-Red-coloring-Istock-300x300.jpg",
        "DOG" : "https://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg",
        "BIRD" : "https://abcbirds.org/wp-content/uploads/2022/04/Eastern-Bluebird-female.-Photo-by-Steve-BylandShutterstock..png",
        "RABBIT" : "https://cdn.roysfarm.com/wp-content/uploads/Rabbit.jpg",
        "UNDEFINED" : "https://via.placeholder.com/300",
    }

    return (
        <Link to={link} className="card__link">
            <div className="card">
                <img 
                    src={specie in placeHolderImage ? (placeHolderImage[specie]) : (placeHolderImage["UNDEFINED"])} 
                    alt={name} 
                    className="card__image" 
                />
                <div className="card__content">
                    <div className="card__content__row">
                        <h3>{name}</h3>

                        <div className="pet__data__description">
                            <span className="pet__icon__style"
                                title={specie in specieIconDescription ? specieIconDescription[specie]: specieIconDescription["UNDEFINED"]}
                                >
                                {specie in specieIconDescription ? specieIcon[specie]: specieIcon["UNDEFINED"]}
                            </span>

                            <span className="pet__icon__style"
                                title={gender ? genderIconDescription[gender]: genderIconDescription["UNDEFINED"]}
                                >
                                {gender ? genderIcon[gender]: genderIcon["UNDEFINED"]}
                            </span>
                        </div>


                    </div>

                    <div className="card__content__row">
                        {/* <p>{description}</p> */}
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu</p>
                    </div>

                </div>
            </div>
        </Link>
    );
}

export default PetCardComponent;