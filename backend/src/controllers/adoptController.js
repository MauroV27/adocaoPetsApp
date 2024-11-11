import { PrismaClient } from "@prisma/client"
const prismaClient = new PrismaClient();

export async function create(req, res) {
  const { adoptionDate, petId, userId } = req.body;
  const isoAdoptionDate = new Date(adoptionDate).toISOString();

  await prismaClient.adoption.create({
    data: { adoptionDate: isoAdoptionDate, petId, userId },
    select: { id: true, adoptionDate: true, petId: true, userId: true }
  })
  .then(adopt => res.status(201).json({
    message: "Adoption created successfully",
    adopt: adopt
  }))
  .catch((error) => res.status(500).json({ error: error.message }));
}

export async function getById(req, res) {
  const { id } = req.params;
  prismaClient.adoption
    .findUnique({
      where: { id: id },
    })
    .then((adopt) => res.json(adopt))
    .catch(() => res.status(500).json({ error: "Internal Server Error" }));
}

export async function getAll(req, res) {
  prismaClient.adoption.findMany({
    select: { id: true, adoptionDate: true, petId: true, userId: true }
  })
  .then(adoptions => res.status(200).json(adoptions))
  .catch(error => res.status(500).json({ error: error.message }));
}

export async function update(req, res) {
  const { id } = req.params;
  const { adoptionDate, petId, userId } = req.body;
  prismaClient.adoption
    .update({
      where: { id: id },
      data: { adoptionDate, petId, userId },
    })
    .then((adopt) => res.json(adopt))
    .catch(() => res.status(500).json({ error: "Internal Server Error" }));
}

export async function deleteAdoption(req, res) {
  const { id } = req.params;
  prismaClient.adoption
    .delete({
      where: { id: id },
    })
    .then(() =>
      res.status(204).json({
        message: "Adoption deleted successfully",
      })
    )
    .catch(() => res.status(500).json({ error: "Internal Server Error" }));
}