import { prisma } from "../libs/prismaClient.js";

export class PetController {
  async create(req, res) {
    try {
      const { name, specie, dob, description, status, size, personality } =
        req.body;

      const pet = await prisma.pet.create({
        data: {
          name,
          specie,
          dob,
          description,
          status,
          size,
          personality,
        },
      });

      return res.status(201).json({ pet });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ error });
    }
  }

  async getAll(req, res) {
    try {
      const pets = await prisma.pet.findMany({
        select: {
          id: true,
          name: true,
          dob: true,
          description: true,
          status: true,
        },
      });

      return res.status(200).json({ pets });
    } catch (error) {
      console.error({ error });
      return res.status(500).json({ error });
    }
  }

  async getOneById(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}
