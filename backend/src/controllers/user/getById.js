import { prismaClient } from "../../database/prismaClient.js";

export async function getById(req, res) {
    /**
        #swagger.tags = ['User']
        #swagger.description = 'Endpoint to get user by ID.'
        #swagger.summary = 'Get user by ID.'
    */

    const userId = req.params.id;
    const { id } = req.user;
    const access = req.access;

    if ( access != "ADMIN" && id != userId ){
        return res.status(403).json({
            message : "Unauthorized access"
        })
    }

    const response = await prismaClient.user.findUnique({
        where : {
            id : userId
        },
        select : {
            id: true,
            name: true,
            address: true, 
            phone: true, 
            email: true, 
            role: true, 
            Adoption: true      
        }
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