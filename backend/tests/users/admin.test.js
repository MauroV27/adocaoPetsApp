import request from "supertest";
import { app } from "../../src/app";
import { utilsCreateUserWithPisma } from "./utils";

describe("Admin endpoints", () => {

    test("Promote Commom User to ADMIN - Success", async () => {
        
        // Arrange : 
        const admin = await utilsCreateUserWithPisma("admin", "adm@mail.com", "000", "Adm Street", "123456", "ADMIN");
        const fakeUser = await utilsCreateUserWithPisma("UserToPromote", "userPromo@notadm.com", "79797", "Common Street, n 1", "654");

        const loginAdmin = await request(app).post("/login").send({
            "email" : admin.email,
            "password" : "123456"
        });

        const token = loginAdmin.body.token;

        // Act : 
        const response = await request(app).post("/user/promote")
            .set({
                "authorization": token,
                "accept" : "/"
            })
            .send({
                "promoteId" : fakeUser.id
            });

        // Assert : 
        const user = response.body.user;

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User promoted successfully");
        
        // user must contains only id, name and role :
        expect(Object.keys(user)).toEqual(Object.keys({'id': 0, 'name': 0, 'role':0}));

        expect(typeof user.id).toBe("string");
        expect(user.name).toBe(fakeUser.name);
        expect(user.role).toBe("ADMIN");
        
    });

    test("Promote Commom User to ADMIN - Fail - Promote user not registered", async () => {
        // Arrange : 
        const admin = await utilsCreateUserWithPisma("admin 2", "adm2@mail.com", "165165", "Adm Street", "123456", "ADMIN");

        const loginAdmin = await request(app).post("/login").send({
            "email" : admin.email,
            "password" : "123456"
        });

        const token = loginAdmin.body.token;

        // Act : 
        const response = await request(app).post("/user/promote")
            .set({
                "authorization": token,
                "accept" : "/"
            })
            .send({
                "promoteId" : "c32d8b45-92fe-44f6-8b61-42c2107dfe87" // UUID not registered in db
            });

        // Assert : 
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User to promote not found");
        expect(response.body.error).toBe(true);
        
    });

    test("Admin access data from Commom User", async () => {
        // Arrange : 
        const admin = await utilsCreateUserWithPisma("admin 2", "adm3@mail.com", "561632", "Adm Street", "123456", "ADMIN");
        const fakeUser = await utilsCreateUserWithPisma("UserToPromote", "userToBisbilhotar@notadm.com", "1123213", "Common Street, n 1", "654");

        const loginAdmin = await request(app).post("/login").send({
            "email" : admin.email,
            "password" : "123456"
        });

        const token = loginAdmin.body.token;
        const id = fakeUser.id;

        // Act : 
        const response = await request(app).get("/user/" + id).set({
            "authorization": token,
            "accept" : "/"
        });

        // Assert : 
        const user = response.body.data;

        expect(response.status).toBe(201);
        
        // user must contains only id,  name, phone, address, role, Adoption :
        expect(Object.keys(user)).toEqual(Object.keys({
            'id': 0, 'name': 0, 'email':0, 'phone':0, 'address':0, 'role':0, "Adoption":0
        }));

        expect(user.id).toBe(fakeUser.id);
        expect(user.name).toBe(fakeUser.name);
        expect(user.email).toBe(fakeUser.email);
        expect(user.phone).toBe(fakeUser.phone);
        expect(user.address).toBe(fakeUser.address);
        expect(user.role).toBe(fakeUser.role);
        expect(user.Adoption).toHaveLength(0);
    });

    test("Get all users", async () => {
        // Arrange : 
        const admin = await utilsCreateUserWithPisma("admin 4", "adm4@mail.com", "11354168", "Adm Street", "123456", "ADMIN");

        const loginAdmin = await request(app).post("/login").send({
            "email" : admin.email,
            "password" : "123456"
        });

        const token = loginAdmin.body.token;
        
        // Act : 
        const response = await request(app).get("/users").set({
            "authorization": token,
            "accept" : "/"
        });

        // Assert : 
        const body = response.body;

        const user = body[0];

        expect(response.status).toBe(200);
        expect(body.length).toBeGreaterThan(1);
        
        // user must contains only id,  name, phone, address, role :
        expect(Object.keys(user)).toEqual(Object.keys({
            'id': 0, 'name': 0, 'email':0, 'phone':0, 'address':0, 'role':0
        }));

        expect(typeof user.id).toBe("string");
        expect(typeof user.name).toBe("string");
        expect(typeof user.email).toBe("string");
        expect(typeof user.phone).toBe("string");
        expect(typeof user.address).toBe("string");
        expect(typeof user.role).toBe("string");
    });

});