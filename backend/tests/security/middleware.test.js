import jwt from 'jsonwebtoken';
import { authAdminMiddleware, authMiddleware, createJWTToken } from "../../src/security/jwt-middleware.js";
import request from 'supertest';
import { app } from "../../src/app";
import { tokenAdmin, tokenUser, petId, userId, createUserWithPrisma } from "../setupTests.js";
import { prismaClient } from "../../src/database/prismaClient.js";

describe("MiddleWare tests", () => {

    it.todo('testar apenas a função de middleware, sem usar rota');
});