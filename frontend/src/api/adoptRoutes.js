import axios from "axios";
import { baseURL } from "./baseURL.js";

const adoptURL = baseURL + "/adoption";

axios.defaults.withCredentials = true; // Permitir envio de cookies em requisições

/**
 * ## Create Adoption
 * @param {Object} body - Deve conter petId e userId
 * @returns {(
 *      message: string,
 *      adoption: {
 *          id: string,
 *          adoptionDate: string,
 *          petId: string,
 *          userId: string
 *      }
 * )} 
 */
export const createAdoption = async (body) => {
    console.log(body);
    const adoptionData = {
        adoptionDate: new Date().toISOString(),
        petId: body.petId,
        userId: body.userId
    };

    return await axios.post(adoptURL, adoptionData);
};