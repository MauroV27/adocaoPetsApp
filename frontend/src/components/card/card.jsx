import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

function CardComponent({image, title, description, link}) {
    return (
        <Link to={link} className="card-link">
            <div className="card">
                <img src={image} alt={title} className="card-image" />
                <div className="card-content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    );
}

export default CardComponent;