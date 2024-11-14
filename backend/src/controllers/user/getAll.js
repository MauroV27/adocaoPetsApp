import { prismaClient } from "../../database/prismaClient.js";

export async function getAll(req, res) {
	const { limit = 10, offset = 0 } = req.query;

	await prismaClient.user.findMany({
		skip: parseInt(offset),
		take: parseInt(limit),
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			address: true,
			role: true,
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