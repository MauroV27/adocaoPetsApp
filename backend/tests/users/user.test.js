import request from "supertest";
import { app } from "../../src/app";
import { utilsCreateUserWithPisma } from "./utils";

describe("User endpoints", () => {

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

    test.todo("Create User with weak password");

    test("User Login successfully", async () => {

        // Arrange :
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

    test("Get data from User in API successfully", async () => {

        // Arrange
        const fakeUser = await utilsCreateUserWithPisma("UserToGetData", "user2@mail.com", "2222", "Common Street, n 2", "654");

        const loginResponse = await request(app).post("/login").send({
            "email" : fakeUser.email,
            "password" : "654"
        });

        const token = loginResponse.body.token;
        const id = fakeUser.id;

        // Act : 
        const response = await request(app).get("/user/" + id).set({
            "authorization": token,
            "accept" : "/"
        });

        // Assert : 
        const user = response.body.data;

        expect(response.status).toBe(201);
        
        // user must contains only id and name :
        expect(Object.keys(user)).toEqual(Object.keys({'id': 0, 'name': 0, 'email':0, 'phone':0, 'address':0, 'role':0, "Adoption":0}));

        expect(user.id).toBe(fakeUser.id);
        expect(user.name).toBe(fakeUser.name);
        expect(user.email).toBe(fakeUser.email);
        expect(user.phone).toBe(fakeUser.phone);
        expect(user.address).toBe(fakeUser.address);
        expect(user.role).toBe(fakeUser.role);
        expect(user.Adoption).toHaveLength(0);
    });

    test("Fail to get data from User in API - Not Send Token", async () => {

        // Arrange : 
        const fakeUser = await utilsCreateUserWithPisma("UserWithout", "user1222@mail.com", "15613150", "Common Street, n 2", "654");

        const loginResponse = await request(app).post("/login").send({
            "email" : fakeUser.email,
            "password" : "654"
        });

        const id = fakeUser.id;

        // Act : 
        const response = await request(app).get("/user/" + id);

        // Assert : 
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Token not provided");
    });


    test("Fail to get data from User in API - User unathourized", async () => {

        // Arrange : 
        const fakeUser = await utilsCreateUserWithPisma("Mr Hack", "user2@mrshack.com", "31235", "Common Street, n 2", "654");
        const fakeUserVictim = await utilsCreateUserWithPisma("Victim", "aaa@mail.com", "131454", "Common Street, n 2", "654");

        const loginResponse = await request(app).post("/login").send({
            "email" : fakeUser.email,
            "password" : "654"
        });

        const token = loginResponse.body.token;
        const id = fakeUserVictim.id;

        // Act : 
        const response = await request(app).get("/user/" + id).set({
            "authorization": token,
            "accept" : "/"
        });

        // Assert : 
        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Unauthorized access");

    });

    test.todo("Update User with valid data");

    test.todo("Update User with invalid data:email already registered by another user");

    test.todo("Update User with invalid data:phone already registered by another user");

    test.todo("Delete User that never adopted");

    test.todo("Delete User that already adopted");

});