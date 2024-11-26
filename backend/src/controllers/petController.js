import { prismaClient } from "../database/prismaClient.js";

export function create(req, res) {
  const { name, specie, dob, description, breed, gender, size, personality } = req.body;
  const isoDob = new Date(dob).toISOString();

  prismaClient.pet.create({
    data: {
      name,
      specie,
      dob: isoDob,
      description,
      breed,
      gender,
      size,
      personality
    },
    select: { id: true, name: true, specie: true, dob: true, description: true, breed: true, gender: true, status: true, size: true, personality: true }
  })
  .then(newPet => res.status(201).json({ message: "Pet created successfully", pet: newPet }))
  .catch(error => res.status(500).json({ error: error.message }));
}

export function getPetById(req, res) {
  const { id } = req.params;

  prismaClient.pet.findUnique({
    where: { id },
    select: { id: true, name: true, specie: true, dob: true, description: true, breed: true, gender: true, status: true, size: true, personality: true }
  })
  .then(pet => {
    if (pet) {
      res.status(200).json(pet);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  })
  .catch(error => res.status(500).json({ error: error.message }));
}

export function getAll(req, res) {
  const { limit = 10, offset = 0, size, personality, gender } = req.query;

  const filters = {};
  if (size) filters.size = size;
  if (personality) filters.personality = personality;
  if (gender) filters.gender = gender;

  prismaClient.pet.findMany({
    skip: parseInt(offset),
    take: parseInt(limit),
    where: filters,
    select: { id: true, name: true, specie: true, dob: true, description: true, breed: true, gender: true, status: true, size: true, personality: true }
  })
  .then(pets => {
    if (pets > 0) {
      console.log("pets", pets);
      res.status(200).json(pets);
    } else {
      res.status(404).json({ message: "No pets found" });
    }
  })
  .catch(error => res.status(500).json({ error: error.message }));
}

export function update(req, res) {
  const { id } = req.params;
  const { name, specie, dob, description, breed, gender, status, size, personality } = req.body;
  const isoDob = new Date(dob).toISOString();

  prismaClient.pet.update({
    where: { id },
    data: {
      name,
      specie,
      dob: isoDob,
      description,
      breed,
      gender,
      status,
      size,
      personality
    },
    select: { id: true, name: true, specie: true, dob: true, description: true, breed: true, gender: true, status: true, size: true, personality: true }
  })
  .then(updatedPet => res.status(200).json({ message: "Pet updated successfully", pet: updatedPet }))
  .catch(error => res.status(500).json({ error: error.message }));
}

export function deletePet(req, res) {
  const { id } = req.params;

  prismaClient.pet.delete({
    where: { id }
  })
  .then(() => res.status(204).json({ message: "Pet deleted successfully" }))
  .catch(error => res.status(500).json({ error: error.message }));
}