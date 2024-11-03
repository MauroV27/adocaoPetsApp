import { prismaClient } from "../../database/prismaClient.js";

export async function promoteUserToAdmin(req, res){

    // Validate request body
    const { promoteId } = req.body;
    const { id } = req.token.data;

    // 1. Check if user(mail, passowrd) has role of ADMIN
    const currentUser = await prismaClient.user.findUnique({
        where: { id },
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