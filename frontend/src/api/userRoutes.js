import axios from 'axios';
import { baseURL } from './baseURL.js';

/**
 * ## Create user account :
 * @param {(
 *  name: string, 
 *  email: string, 
 *  phone: string, 
 *  address: string, 
 *  password: string
 * )} body
 * @returns {(
 *      message : string, 
 *      user : {
 *         id : string,
 *         name : string
 *      }
 * )} 
 */
export const singup  = async (body) => {
    return await axios.post(baseURL + "/singup", body);
};




/**
 * ## Login user in system :
 * @param {(email:string, password:string)} body
 * @returns {(
 *   cookie : jwt_token,
 *   json : {
 *       token : string, 
 *       message : string, 
 *       success : true
 *   }
 *   )} A cookie and a json with token data
 */
export const login  = async (body) => {
    return await axios.post(baseURL + "/login", body);
};


/**
 * ## Get user by id
 * > Only the account user and admins can see the response.
 * @param {string} id 
 * @param {Object} headers - Must contains a token. 'authorization' = token 
 * @returns {(
 *       {
 *        id: string,
 *        name: string,
 *        address: string,
 *        phone: string,
 *        email: string,
 *        role: string,
 *        Adoption: [],
 *      } 
 * )}
 */
export const getUserById  = async (id, headers) => {
    return await axios.get(`${baseURL}/user/${id}`, headers);
};


/**
 * ## Get Users
 * > Allowed only for admins
 * @param {number} limit 
 * @param {number} offset 
 * @param {Object} headers - Must contains a token. 'authorization' = token. Valid only for admins 
 * @returns {(
*       {
*        id: string,
*        name: string,
*        address: string,
*        phone: string,
*        email: string,
*        role: string,
*        Adoption: [],
*      }[] 
* )} List of users
 */
export const getUsers  = async (limit = 10, offset = 0, headers) => {
    return await axios.get($`${baseURL}/users?limit=${limit}&offset=${offset}`);
};

/**
 * ## Update user
 * @param {string} id 
 * @param {*} body 
 * @returns {{
 *  message : string, 
 *  user : {        
 *      id: string, 
 *      name: string, 
 *      email: string, 
 *      phone: string, 
 *      address: string, 
 *      role: string
 *    }
 * } | {error: string}}
 */
export const updateUser  = async (id, body) => {
    return await axios.put(`${baseURL}/user/${id}`, body);
};


/**
 * ## Delete user
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
export const deleteUser  = async (id, headers) => {
    return await axios.delete(`${baseURL}/user/${id}`, headers);
};

/**
 * ## Promote common user to Admin
 * > Allowed only for admins
 * @param {string} promoteId 
 * @param {Object} headers - Must contains a token. 'authorization' = token 
 * @returns 
 */
export const promoteUser  = async (promoteId, headers) => {
    return await axios.delete(baseURL + "/user/promote", {promoteId}, headers);
};
