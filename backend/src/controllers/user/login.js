import { prismaClient } from "../../database/prismaClient.js";
import { compare } from "../../security/crypt.js";
import { createJWTToken } from "../../security/jwt-midleware.js";

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

    const createUserToken = createJWTToken({id : user.id});

    // Login bem-sucedido
    return res.status(200).json({ success: true, message: 'Login successfully', token: createUserToken });
}