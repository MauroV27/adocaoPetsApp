import { PrismaClient } from '@prisma/client';

import pkg from 'bcryptjs';
const { hash } = pkg;

const prisma = new PrismaClient();

async function main() {
    const email = process.env.ADMIN_EMAIL;
    const hashedPassword = await hash(process.env.ADMIN_PASSWORD, 10); 

    // Verificar se já existe um usuário com o email e senha especificados
    const existingAdmin = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });

    if (existingAdmin) {
        console.warn('A user with administrator credentials already exists. \n>> Aborting creation.');
        return;
    }

    const user = await prisma.user.create({
        data: {
            name: 'Administrador',
            email: email,
            password: hashedPassword,
            role: 'ADMIN',
            phone: "",
            address: ""
        },
    });

    console.log(">> Created ADMIN USER for email : ", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });