import { prismaClient } from "../database/prismaClient.js";
export async function create(req, res) {
  /**
      #swagger.tags = ['Pets']
      #swagger.description = 'Endpoint to create a new pet.'
      #swagger.summary = 'Create a new pet.'
  */

  try {
    const { name, specie, breed, gender, dob, description, size, personality } =
      req.body;

    const pet = await prismaClient.pet.create({
      data: {
        name,
        specie,
        breed,
        gender,
        dob: new Date(dob),
        description,
        size,
        personality,
      },
    });
    // #swagger.responses[201] = { description: 'User registered successfully.' }
    return res.status(201).json({ pet });
  } catch (error) {
    // #swagger.responses[500] = { description: 'Server error.' }
    return res.status(500).json({ error: error.message });
  }
}

export async function getAll(req, res) {
  const { limit = 10, offset = 0 } = req.query;
  /**
    #swagger.tags = ['Pets']
    #swagger.description = 'Endpoint to get all pets.'
    #swagger.summary = 'Get all pets.'
  */
  try {
    const pets = await prismaClient.pet.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        specie: true,
        breed: true,
        gender: true,
        dob: true,
        description: true,
        size: true,
        personality: true,
      },
    });
    // #swagger.responses[200] = { description: 'Successful request.' }
    return res.status(200).json({ pets });
  } catch (error) {
    console.error({ error });
    // #swagger.responses[500] = { description: 'Server error.' }
    return res.status(500).json({ error: error.message });
  }
}

export class PetController {
  async getOneById(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}
