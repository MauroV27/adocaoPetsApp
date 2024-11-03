import { prismaClient } from "../../database/prismaClient.js";

export async function getById(req, res) {
    /**
        #swagger.tags = ['User']
        #swagger.description = 'Endpoint to get user by ID.'
        #swagger.summary = 'Get user by ID.'
    */

    const userId = req.params.id;
    const { id } = req.token.data;

    const responseBody = ( id == userId ) ? {
        id: true,
        name: true,
        address: true, 
        phone: true, 
        email: true, 
        role: true, 
        Adoption: true        
    } : {
        id: true,
        name: true
    }

    const response = await prismaClient.user.findUnique({
        where : {
            id : userId
        },
        select : responseBody
    })
        .then( user => {
            return res.status(201).json({
                data : user
            });
        })
        .catch( error => {
            return res.status(500).json({
                error
            });
        });

    return response;
}