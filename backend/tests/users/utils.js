import { prismaClient } from "../../src/database/prismaClient";

import pkg from 'bcryptjs';
const { hash } = pkg;

export async function utilsCreateUserWithPisma(name, email, phone, address, password, role = "USER") {
    return await prismaClient.user.create({
        data : {
            name, email, phone, address, password: await hash(password, 10), role
        }
    }).then( user => user);
}