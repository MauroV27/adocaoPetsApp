import request from "supertest";
import { app } from "../../src/app";
import { petId, userId, adoptionId, tokenAdmin } from "../setupTests";

describe("Adoption Endpoints", () => {
  it("create a new adoption", async () => {
    const response = await request(app)
      .post("/adoption")
      .set("Authorization", `${tokenAdmin}`)
      .send({
        adoptionDate: "2023-01-01",
        petId: petId,
        userId: userId,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Adoption created successfully");
    expect(response.body.adopt).toHaveProperty("id");
  });

  it("get an adoption by id", async () => {
    const response = await request(app)
      .get(`/adoption/${adoptionId}`)
      .set("Authorization", `${tokenAdmin}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", adoptionId);
  });

  it("get all adoptions", async () => {
    const response = await request(app)
      .get("/adoption")
      .set("Authorization", `${tokenAdmin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("update an adoption", async () => {
    const response = await request(app)
      .put(`/adoption/${adoptionId}`)
      .set("Authorization", `${tokenAdmin}`)
      .send({
        adoptionDate: "2023-02-01",
        petId: petId,
        userId: userId,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("adoptionDate", "2023-02-01");
  });

  it("delete an adoption", async () => {
    const response = await request(app)
      .delete(`/adoption/${adoptionId}`)
      .set("Authorization", `${tokenAdmin}`);

    expect(response.status).toBe(204);
  });
});