import { createJWTToken } from "../src/security/jwt-middleware";
import { prismaClient } from "../src/database/prismaClient";
import pkg from "bcryptjs";

let petId;
let userId;
let adminId;
let adoptionId;
let tokenUser;
let tokenAdmin;

const fakeUser = {
    "name": "Fake User",
    "email": "fakeUser1@test.com",
    "phone": "33333333",
    "address": "Rua dos loucos, número 0",
    "password": "321"
};

async function createPetWithPrisma(
    name = "Lilica",
    specie = "Dog",
    breed = "Stray",
    gender = "FEMALE",
    dob = "2020-01-01T00:00:00.000Z",
    description = "Uma cadela hiperativa e carinhosa para animar sua casa.",
    status = "AVAILABLE",
    size = "SMALL",
    personality = "PLAYFUL"
) {
    const pet = await prismaClient.pet.create({
        data: {
            name,
            specie,
            breed,
            gender,
            dob,
            description,
            status,
            size,
            personality,
        },
    });

    return pet;
}

async function createUserWithPrisma(
    name = fakeUser.name,
    email = fakeUser.email,
    phone = fakeUser.phone,
    address = fakeUser.address,
    password = fakeUser.password,
    role = "USER"
) {
    const user = await prismaClient.user.create({
        data: {
            name,
            email,
            phone,
            address,
            password,
            role,
        },
    });

    return user;
}

async function createAdoptionWithPrisma(
    adoptionDate = "2023-01-01",
    petId,
    userId
) {
    const adoption = await prismaClient.adoption.create({
        data: {
            adoptionDate,
            petId,
            userId,
        },
    });

    return adoption;
}

async function resetDatabase() {
    await prismaClient.pet.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.adoption.deleteMany();
}

beforeEach(async () => {
    // Resetando o banco de dados
    await resetDatabase();

    // Criando o usuário e o administrador
    const user = await createUserWithPrisma();
    const admin = await createUserWithPrisma(fakeUser.name, "adm@adm.com", fakeUser.phone, fakeUser.address, fakeUser.password, "ADMIN");
    
    userId = user.id;
    adminId = admin.id;

    // Gerando os tokens
    tokenUser = createJWTToken({ id: userId }, { expiresIn: '2h' });
    tokenAdmin = createJWTToken({ id: adminId }, { expiresIn: "2h" });

    // Criando o pet
    const pet = await createPetWithPrisma();
    petId = pet.id;

    // Criando a adoção
    const adoption = await createAdoptionWithPrisma("2023-01-01", petId, userId);
    adoptionId = adoption.id;
});

afterAll(async () => {
    await prismaClient.$disconnect();
});

export { petId, userId, adminId, adoptionId, tokenUser, tokenAdmin, createPetWithPrisma, createUserWithPrisma, createAdoptionWithPrisma, resetDatabase };