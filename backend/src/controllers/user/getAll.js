import { prismaClient } from "../../database/prismaClient.js";

export async function getAll(req, res) {
	const { limit = 10, offset = 0, name = '' } = req.query;
  const whereClause = name ? {
    name: {
      contains: name,
      mode: 'insensitive' // Para pesquisa case-insensitive
    }
  } : {};
	await prismaClient.user.findMany({
		skip: parseInt(offset),
		take: parseInt(limit),
		where: whereClause,
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			address: true,
			role: true,
			created_at: true,
			Adoption: true,
		},
	})
		.then((users) => 
			res.
				status(200).
				json(users)
		)
		.catch((error) => 
			res.
				status(500).
				json({ 
					error: error.message 
				}		
		));
}