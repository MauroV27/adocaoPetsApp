import jwt from 'jsonwebtoken';
import { createJWTToken } from "../../src/security/jwt-middleware.js";
import request from 'supertest';
import { app } from "../../src/app";
import { tokenAdmin, tokenUser, petId, userId, createUserWithPrisma } from "../setupTests.js";
import { expect, jest } from '@jest/globals';
import { prismaClient } from "../../src/database/prismaClient.js";

describe("Security tests", () => {

    it('JWT Token Creation and Validation', () => {
        const data = { test: 'test' };
        const token = createJWTToken(data);

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        expect(decoded.data.test).toBe(data.test);
        expect(decoded.exp).toBeDefined();
    });
    
    it('Delete Pet with Valid Token in Cookie', async () => {
        const response = await request(app)
        .delete(`/pets/${petId}`)
        .set('Cookie', [`jwt_token=${tokenAdmin}`]);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Pet deleted successfully.');
    });
    
    it('Delete Pet with valid Token', async () => {
        const response = await request(app)
            .delete(`/pets/${petId}`)
            .set('Authorization', `${tokenAdmin}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Pet deleted successfully.');
    });

    it('Delete Pet with invalid user in token', async () => {
        const token = createJWTToken({ id: 'invalidId' });

        const response = await request(app)
        .delete(`/pets/${petId}`)
        .set('Authorization', `${token}`);

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('User Unauthorized');
    });

    it('Delete Pet with invalid Token', async () => {
        const invalidToken = 'invalidToken123';

        const response = await request(app)
            .delete(`/pets/${petId}`)
            .set('Authorization', `${invalidToken}`);

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Token inválido ou expirado');
    });
    
    it('Delete Pet without Authorization Token', async () => {
        const response = await request(app)
            .delete(`/pets/${petId}`);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Token não fornecido');
    });

    it('Delete Pet with Expired Token', async () => {
        jest.useFakeTimers();
        // Avança o tempo por 2h e 1 segundo.
        jest.advanceTimersByTime(2 * 60 * 60 * 1000 + 1000);

        const response = await request(app)
            .delete(`/pets/${petId}`)
            .set('Authorization', `${tokenAdmin}`);
        jest.useRealTimers();
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Token inválido ou expirado');
    });

    it('Delete Pet with User Token', async () => {
        const response = await request(app).delete(`/pets/${petId}`).set('Authorization', `${tokenUser}`);
        
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('User Unauthorized');
    });

    it('get user with valid token', async () => {
        const response = await request(app)
            .get(`/user/${userId}`)
            .set('Authorization', `${tokenUser}`);
        expect(response.status).toBe(201);
        expect(response.body.data.id).toBe(userId);
    });
    it("get user with no any token", async () => {
      const response = await request(app).get(`/user/${userId}`);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Token não fornecido");
    });

    it('get user with wrongId', async () => {
        const otherUser = await createUserWithPrisma();
        const token = createJWTToken({ id: otherUser.id }, { expiresIn: "2h" });
        const response = await request(app)
            .get(`/user/${userId}`)
            .set('Authorization', `${token}`);
        expect(response.body.message).toBe('Unauthorized access');
        expect(response.status).toBe(403);
    });

    it('get user with token admin', async () => {

        const response = await request(app)
            .get(`/user/${userId}`)
            .set('Authorization', `${tokenAdmin}`);
        expect(response.status).toBe(201);
    });
    
    it('get user with token invalid', async () => {
        const tokenInvalid = "invalidToken";
        const response = await request(app)
          .get(`/user/${userId}`)
          .set("Authorization", `${tokenInvalid}`);
        expect(response.status).toBe(403);
    });
    
});
