import request from "supertest";
import { app } from "../../src/app";
import { petId, tokenAdmin } from "../setupTests.js";

describe("Pet Endpoints", () => {
  it("test create a new pet", async () => {
    const response = await request(app).post("/pets").set("authorization", `${tokenAdmin}`).send({
      name: "Lilica",
      specie: "Dog",
      breed: "Stray",
      gender: "FEMALE",
      dob: "2020-01-01T00:00:00.000Z",
      description: "Uma cadela hiperativa e carinhosa para animar sua casa.",
      status: "AVAILABLE",
      size: "SMALL",
      personality: "PLAYFUL",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Pet created successfully");
    expect(response.body.pet).toEqual({
      id: expect.any(String),
      name: "Lilica",
      specie: "Dog",
      breed: "Stray",
      gender: "FEMALE",
      dob: expect.any(String),
      description: "Uma cadela hiperativa e carinhosa para animar sua casa.",
      status: "AVAILABLE",
      size: "SMALL",
      personality: "PLAYFUL",
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it("test read all pets", async () => {
    const response = await request(app).get("/pets");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ pets: expect.any(Array) });
  });
  
  it("test filter pets by size", async () => {
    const response = await request(app).get("/pets").query({ size: "SMALL" });
    expect(response.status).toBe(200);
    expect(response.body.pets).toBeInstanceOf(Array);
    response.body.pets.forEach(pet => {
      expect(pet.size).toBe("SMALL");
    });
  });

  it("test filter pets by personality", async () => {
    const response = await request(app).get("/pets").query({ personality: "PLAYFUL" });
    expect(response.status).toBe(200);
    expect(response.body.pets).toBeInstanceOf(Array);
    response.body.pets.forEach(pet => {
      expect(pet.personality).toBe("PLAYFUL");
    });
  });

  it("test filter pets by gender", async () => {
    const response = await request(app).get("/pets").query({ gender: "FEMALE" });
    expect(response.status).toBe(200);
    expect(response.body.pets).toBeInstanceOf(Array);
    response.body.pets.forEach(pet => {
      expect(pet.gender).toBe("FEMALE");
    });
  });

  it("test filter pets by size and personality", async () => {
    const response = await request(app).get("/pets").query({ size: "SMALL", personality: "PLAYFUL" });
    expect(response.status).toBe(200);
    expect(response.body.pets).toBeInstanceOf(Array);
    response.body.pets.forEach(pet => {
      expect(pet.size).toBe("SMALL");
      expect(pet.personality).toBe("PLAYFUL");
    });
  });
  it("test no pets found", async () => {
    const response = await request(app).get("/pets").query({ size: "LOYAL" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "No pets found" });
  });
  it("test read a specific pet", async () => {
    const response = await request(app).get(`/pets/${petId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", petId);
  });

  it("test read a pet return not found", async () => {
    const petInvalidId = 'invalidId';
    const response = await request(app).get(`/pets/${petInvalidId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Pet not found" });
  });


  it("test update a pet", async () => {
    const response = await request(app).put(`/pets/${petId}`)
    .set("authorization", `${tokenAdmin}`)
    .send({
      name: "Buddy",
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
    expect(response.body.pet).toBeInstanceOf(Object);
    expect(response.body.pet).toHaveProperty("name", "Buddy");
  });

  it("test delete a pet", async () => {
    const response = await request(app)
    .delete(`/pets/${petId}`)
    .set("authorization", `${tokenAdmin}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Pet deleted successfully." });
  });
});
