import React from 'react';
import { IoMdMale, IoMdFemale, IoMdStar } from "react-icons/io";
import { PiCatFill, PiDogFill, PiBirdFill, PiRabbitFill, PiQuestionFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import './pet-card.css';
import { FaQuestion } from 'react-icons/fa';

// import images from assets : 
import catImage from '../../assets/pets-images/cat.png';
import dogImage from '../../assets/pets-images/dog.png';
import birdImage from '../../assets/pets-images/bird.png';
import rabbitImage from '../../assets/pets-images/rabbit.png';
import undefiedImage from '../../assets/pets-images/undefined-300.png';

function PetCardComponent({pet}) {

    const { image, name, gender, description, specie, id } = pet;

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
        "UNDEFINED" : `Animal da espécie : ${(specie + '').toLowerCase()}`
    }

    const genderIcon = {
        "FEMALE" : <IoMdFemale />,
        "MALE" : <IoMdMale />,
        "UNDEFINED" : <FaQuestion />,
    }

    const genderIconDescription = {
        "FEMALE" : "Fêmea",
        "MALE" : "Macho",
        "UNDEFINED" : "Sexo do pet é desconhecido"
    }

    // Placeholder images to represent pet specie
    const placeHolderImage = {
        "GATO" : catImage,
        "DOG" : dogImage,
        "BIRD" : birdImage,
        "RABBIT" : rabbitImage,
        "UNDEFINED" : undefiedImage,
    }

    return (
        <Link to={'/pet/' + id} className="card__link">
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
                        <p>{description}</p>
                    </div>

                </div>
            </div>
        </Link>
    );
}

export default PetCardComponent;