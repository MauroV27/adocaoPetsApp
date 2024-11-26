import axios from 'axios';
import { baseURL } from './baseURL.js';

const petsURL = baseURL + "/pets";

/** Pet data that returnsffrom request
 * @typedef {Object} PetRespose 
 * @property {string} id
 * @property {string} name
 * @property {string} specie
 * @property {string} dob
 * @property {string} description
 * @property {string} breed
 * @property {string} gender
 * @property {string} status
 * @property {string} size
 * @property {string} personality
 */

/**
 * ## Get pet with id
 * @param {string} id - Pet id to found
 * @returns {PetRespose}
 */
export const getPetById  = async (id) => {
    return await axios.get(`${petsURL}/${id}`);
};



/**
 * ## Get list of pets
 * @param {number} limit - default = 10
 * @param {number} offset - default = 0
 * @param {string} size - Can be : UNDEFINED, SMALL, MEDIUM or BIGGER
 * @param {string} personality - Can be : UNDEFINED,  CALM, PLAYFUL or INDEPENDENT
 * @param {string} gender - Can be : UNDEFINED,  MALE,  FEMALE
 * @param {string} status default = AVAILABLE - Can be : AVAILABLE, ADOPTED or INPROCESS
 * @returns {PetRespose[]} List with pets
*/
export const getPets = async (
    limit = 10, 
    offset = 0, 
    size = '', 
    personality = '', 
    gender = '', 
    status = "AVAILABLE"
) => {
    
    const urlBuilder = new URLSearchParams({
        limit, offset, size, personality, gender, status
    });

    return await axios.get(`${baseURL}/pets?${urlBuilder.toString()}`);
};


/**
 * @typedef {Object} CreatePetRequest 
 * 
 * @property {string} name          - required
 * @property {string} specie        - required
 * @property {string} dob           - required
 * @property {string} description   - required        
 * @property {string} breed         - optional, default = null
 * @property {string} gender        - optional, default = UNDEFINED
 * @property {string} size          - optional, default = UNDEFINED 
 * @property {string} personality   - optional, default = UNDEFINED
 */


/**
 * ## Create pet
 * @param {CreatePetRequest} data
 * @returns {PetRespose}
 */
export const createPets = async (data) => {
    return await axios.post(petsURL, {data});
};


/**
 * ## Update pet 
 * @param {string} id - Pet id to update
 * @param {Object} data - json object with data for update pet
 * @param {Object} headers - Must contains a token. 'authorization' = token 
 * @returns {PetRespose}
 */
export const updatePets = async (id, data, headers) => {
    return await axios.put(`${petsURL}/${id}`, data, headers);
};


/**
 * ## Delete pet
 * @param {string} id 
 * @param {Object} headers - Must contains a token. 'authorization' = token 
 * @returns {{
 *  status: 204, 
 *  message : "..."
 * } | {
 *  status: 500, 
 *  error : "..."
 * }}
 */
export const deletePet = async (id, headers) => {
    return await axios.delete(`${petsURL}/${id}`, {}, headers);
};

