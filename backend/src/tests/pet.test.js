const request = require("supertest");
const express = require("express");
const { PrismockClient } = require("prismock");
const app = express();

const prisma = new PrismockClient();

app.use(express.json());

describe.skip("Pet Endpoints", () => {

  it("test create a new pet", async () => {
    const response = await request(app)
      .post("/pets")
      .send({
        name: "Lilica",
        specie: "Dog",
        breed: "Stray",
        gender: "FEMALE",
        dob: "2020-01-01",
        description: "Uma cadela hiperativa e carinhosa para animar sua casa.",
        status: "AVAILABLE",
        size: "SMALL",
        personality: "PLAYFUL",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "Lilica",
      specie: "Dog",
      breed: "Stray",
      gender: "FEMALE",
      dob: "2020-01-01",
      description: "Uma cadela hiperativa e carinhosa para animar sua casa.",
      status: "AVAILABLE",
      size: "SMALL",
      personality: "PLAYFUL",
    });
  });

  it("test read all pets", async () => {
    const response = await request(app).get("/pets");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ pets: expect.any(Array) });
  });

  it("test read a specific pet", async () => {
    const pet = await prisma.pet.create({
      data: {
        name: "Lilica",
        specie: "Dog",
        breed: "Stray",
        gender: "FEMALE",
        dob: new Date("2024-01-01"),
        description: "Uma cadela hiperativa e carinhosa para animar sua casa.",
      },
    });

    const response = await request(app).get(`/pets/${pet.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: pet.id,
      name: pet.name,
      specie: pet.specie,
      breed: pet.breed,
      gender: pet.gender,
      dob: pet.dob.toISOString(),
      description: pet.description,
      status: pet.status,
      size: pet.size,
      personality: pet.personality,
    });
  });

  it("test update a pet", async () => {
    const pet = await prisma.pet.create({
      data: {
        name: "Lilica",
        specie: "Dog",
        breed: "Stray",
        gender: "FEMALE",
        dob: new Date("2020-01-01"),
        description: "Uma cadela hiperativa e carinhosa para animar sua casa.",
      },
    });

    const response = await request(app)
      .put(`/pets/${pet.id}`)
      .send({
        name: "Lilica",
        specie: "Dog",
        breed: "Stray",
        gender: "MALE",
        dob: new Date("2019-01-01"),
        description: "Uma cadela amigável.",
        status: "ADOPTED",
        size: "LARGE",
        personality: "FRIENDLY",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: pet.id,
        name: "Lilica",
        specie: "Dog",
        breed: "Stray",
        gender: "MALE",
        dob: new Date("2019-01-01"),
        description: "Uma cadela amigável.",
        status: "ADOPTED",
        size: "LARGE",
        personality: "FRIENDLY",
    });
  });

  it("test delete a pet", async () => {
    const pet = await prisma.pet.create({
      data: {
        name: "Lilica",
        specie: "Dog",
        breed: "Stray",
        gender: "FEMALE",
        dob: new Date("2020-01-01"),
        description: "Uma cadela hiperativa e carinhosa para animar sua casa.",
      },
    });

    const response = await request(app).delete(`/pets/${pet.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Pet deleted" });
  });
});
