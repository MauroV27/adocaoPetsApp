import { PiCatFill, PiDogFill, PiBirdFill, PiRabbitFill } from "react-icons/pi";
import { IoMdStar } from "react-icons/io";

// import images from assets : 
import catImage from './../assets/pets-images/cat.png';
import dogImage from './../assets/pets-images/dog.png';
import birdImage from './../assets/pets-images/bird.png';
import rabbitImage from './../assets/pets-images/rabbit.png';
import undefiedImage from './../assets/pets-images/undefined-300.png';

const specieData = {
    "CAT": {
        icon: <PiCatFill />,
        description: "Gato",
        image: catImage,
        aliases: ["GATO"]
    },
    "DOG": {
        icon: <PiDogFill />,
        description: "Cachorro",
        image: dogImage,
        aliases: ["CACHORRO"]
    },
    "BIRD": {
        icon: <PiBirdFill />,
        description: "Pássaro",
        image: birdImage,
        aliases: ["PASSARO"]
    },
    "RABBIT": {
        icon: <PiRabbitFill />,
        description: "Coelho",
        image: rabbitImage,
        aliases: ["COELHO"]
    }
};

const genderIconDescription = {
    "FEMALE" : "Fêmea",
    "MALE" : "Macho",
    "UNDEFINED" : "Sexo do pet é desconhecido"
}

// Função para obter dados de uma espécie com suporte a aliases
const getSpecieData = (key) => {
    const specie = Object.entries(specieData).find(([_, data]) => 
        key === _ || data.aliases.includes(key)
    );

    if ( specie ){
        return specie[1];
    }

    return {
        icon: <IoMdStar />,
        description: `Animal da espécie : ${(key + '').toLowerCase()}`,
        image: undefiedImage,
        aliases: []
    };
};

const getGenderDescription = (gender) => {
    return gender ? genderIconDescription[gender] : genderIconDescription["UNDEFINED"]
};

const getPetStatus = (status) => {
    return status ? {
        "AVAILABLE" : "Disponivel para adoção",
        "ADOPTED" : "Já adotado",
        "INPROCESS" : "Em processo de adoção"
    }[status] : "Já adotado"; // Caso algum erro ocorra, não correr o risco de dizer que um pet está disponivel 
}

const getPetSize = (size) => {
    return size ? {        
        "SMALL": "Pequeno",
        "MEDIUM" : "Médio",
        "BIGGER" : "Grande"
    }[size] : "Tamanho não informado";
}

const getPetPersonality = (personality) => {
    return personality ? {
        "CALM" : "Calmo",
        "PLAYFUL" : "Brincalhão",
        "INDEPENDENT" : "Independente"
    }[personality] : "Personalidade não informada";
}

export {
    getSpecieData, 
    getGenderDescription,
    getPetStatus,
    getPetSize,
    getPetPersonality
};