import { prismaClient } from "../database/prismaClient.js";

import pkg from 'bcryptjs';
const { hash, compare } = pkg;

export async function getById(req, res) {
/**
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to get user by ID.'
    #swagger.summary = 'Get user by ID.'
*/
    const userId = req.params.id;

    const response = await prismaClient.user.findUnique({
        where : {
            id : userId
        },
        select : {
            id: true,
            name: true
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

export async function create(req, res) {
    /**
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to create a new user.'
    #swagger.summary = 'Create a new user.'
*/
    // TODO : add validation to req.body data
    const { name, email, phone, address, password } = req.body;
    const hashedPassword = await hash(password, 10);

    const response = await prismaClient.user.create({
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

    return response;

}

export async function updateUser(req, res) {
/**
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to update an existing user.'
    #swagger.summary = 'Update an existing user.'
*/
}

export async function deleteUser(req, res) {
/**
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to delete a user.'
    #swagger.summary = 'Delete a user.'
*/
}

export async function login(req, res) {
/**
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to validate user login.'
    #swagger.summary = 'Validate user login.'
*/
    // TODO : add validation to req.body data
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
        where: {
          email
        },
    })

    if ( !user ) {
        return res.status(401).json({ success: false, message: 'Login failed, invalid credentials.'});
    }

    // Comparar a senha fornecida com a senha hash armazenada
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Login failed, invalid credentials.'});
    }

    // Login bem-sucedido
    return res.status(401).json({ success: true, message: 'Login successfully' });
}

export async function promoteUserToAdmin(req, res){

    // Validate request body
    const { email, password, promoteId } = req.body;

    if (!email || !password || !promoteId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Check if user(mail, passowrd) has role of ADMIN
    const currentUser = await prismaClient.user.findUnique({
        where: { email },
    });

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    // 2. Try to convert user with promoteId in ADMIN 
    //  2.1 If promoteId is a valid user, so promote to ADMIN
    //  2.2 If promoteId not is a valid user, so retunr user not found to promote in ADMIN
    const userToPromote = await prismaClient.user.findUnique({
        where: { id: promoteId },
    });

    if (!userToPromote) {
        return res.status(404).json({ error: 'User to promote not found' });
    }

    // 3. Promote the user to ADMIN
    const updatedUserResponse = await prismaClient.user.update({
        where: { id: promoteId },
        data: { role: 'ADMIN' },
        select : {
            id: true, 
            role: true, 
            name: true
        }
    })
        .then( user => {
            return res.json({ message: 'User promoted successfully', user });
        })
        .catch( error => {
            console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
        });

    return updatedUserResponse;
    
}