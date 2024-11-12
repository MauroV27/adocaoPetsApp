import request from "supertest";
import { app } from "../../src/app";

import { prismaClient } from "../../src/database/prismaClient";

import pkg from 'bcryptjs';
const { hash } = pkg;

async function utilsCreateUserWithPisma(name, email, phone, address, password, role = "USER") {
    return await prismaClient.user.create({
        data : {
            name, email, phone, address, password: await hash(password, 10), role
        }
    }).then( user => user);
}

describe("User endpoints", () => {

    // beforeAll( async () => {

    //     // Insert ADMIN user in DB  :
    //     utilsCreateUserWithPisma("admin", "adm@mail.com", "000", "Adm Street", "123456", "ADMIN")

    // });


    test("Create common User in API successfully", async () => {

        // Arrange : 
        const fakeUserData = {
            "name": "Fake User",
            "email": "fakeUser1@test.com",
            "phone": "33333333",
            "address": "Rua dos loucos, número 0",
            "password": "321"
        };

        // Act : 
        const response = await request(app).post("/singup").send(fakeUserData);

        // Assert : 
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
        
        // user must contains only id and name :
        expect(Object.keys(response.body.user)).toEqual(Object.keys({'id': 0, 'name': 0}));

        expect(typeof response.body.user.id).toBe("string");
        expect(response.body.user.name).toBe(fakeUserData.name);
    });

    test("User Login successfully", async () => {

        const fakeUser = await utilsCreateUserWithPisma("User1", "user1@mail.com", "111", "Common Street, n 1", "654");
        // Act : 
        const response = await request(app).post("/login").send({
            "email" : fakeUser.email,
            "password" : "654"
        });

        const body = response.body;

        expect(response.status).toBe(200);
        expect(body.message).toBe('Login successfully');
        expect(typeof body.token).toBe("string");

    });

    test("User Login failed", async () => {

        // Act : 
        const response = await request(app).post("/login").send({
            email : "ivhweowij@vvkpwk.com",
            password : "jjdi123"
        });

        const body = response.body;

        // Assert :
        expect(response.status).toBe(401);
        expect(body.message).toBe("Login failed, invalid credentials.");

    });

    test.todo("Get data from User in API successfully");

    test.todo("Fail to get data from User in API - User unathourized");

});