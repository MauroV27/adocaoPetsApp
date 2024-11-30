import React from 'react';
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { Link } from 'react-router-dom';
import './pet-card.css';
import { FaQuestion } from 'react-icons/fa';

import { getSpecieData, getGenderDescription } from '../../constant/petClassification';

function PetCardComponent({pet}) {

    const { image, name, gender, description, specie, id } = pet;

    const petDataDescription = getSpecieData(specie);

    const genderIcon = {
        "FEMALE" : <IoMdFemale />,
        "MALE" : <IoMdMale />,
        "UNDEFINED" : <FaQuestion />,
    }

    return (
        <Link to={'/pet/' + id} className="card__link">
            <div className="card">
                <img 
                    src={petDataDescription.image} 
                    alt={name} 
                    className="card__image" 
                />
                <div className="card__content">
                    <div className="card__content__row">
                        <h3>{name}</h3>

                        <div className="pet__data__description">
                            <span className="pet__icon__style"
                                title={petDataDescription.description}
                                >
                                {petDataDescription.icon}
                            </span>

                            <span className="pet__icon__style"
                                title={getGenderDescription(gender)}
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