import pkg from 'jsonwebtoken';
const { verify, sign } = pkg;

import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

function getToken(req) {
    // Primeiro verifica no cabeçalho Authorization
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        return authHeader;//.split(' ')[0]; // Extrai o token após "Bearer"
    }

    // Se não estiver no cabeçalho, verifica no cookie (ex: token armazenado como "jwt_token")
    if (req.cookies && req.cookies.jwt_token) {
        return req.cookies.jwt_token;
    }

    return null;
}

async function getUserInToke( id ) {
    
    const currentUser = await prismaClient.user.findUnique({
        where: { id },
    })
    .then( user => { return user })
    .catch( error => {
        // TODO : Handle error message
        return res.status(500).json({ message : error.message })
    });
    return currentUser;    
}

export async function authAdminMiddleware(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
 
    try {

        const decoded = verify(token, JWT_SECRET);
        const { id } = decoded.data;

        const currentUser = await getUserInToke( id );

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return res.status(403).json({ message: 'User Unauthorized' });
        }

        req.user = currentUser;
        next();
    
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
}


export async function authMiddleware(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    
    try {

        const decoded = verify(token, JWT_SECRET);
        const { id } = decoded.data;

        const currentUser = await getUserInToke( id );

        if (!currentUser || currentUser.role === 'ADMIN') {
            req.access = "ADMIN";
        } else {
            req.access = "USER";
        }

        req.user = currentUser;
        next();
    
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
}

export function createJWTToken( data ){
    return sign({ data }, JWT_SECRET);
}
