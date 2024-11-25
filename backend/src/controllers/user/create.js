import { prismaClient } from "../../database/prismaClient.js";
import { hash } from "../../security/crypt.js";

export async function create(req, res) {
    /**
        #swagger.tags = ['User']
        #swagger.description = 'Endpoint to create a new user.'
        #swagger.summary = 'Create a new user.'
    */
    
    // TODO : add validation to req.body data
    const { name, email, phone, address, password } = req.body;
    const hashedPassword = await hash(password, 10);

    await prismaClient.user.create({
        data : {
            name, 
            email,
            phone, 
            address, 
            password : hashedPassword
        },
        select: {
            id: true, 
            name: true, 
        }
    })
        .then( user => {
            return res.status(201).json({
                message : 'User created successfully',
                user : user
            });
        })
        .catch( error => {
            return res.status(500).json({
                error
            });
        });
}