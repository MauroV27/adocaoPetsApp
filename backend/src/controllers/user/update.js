export function update(req, res) {
	const { id } = req.params;
	const { name, email, phone, address, password, role } = req.body;

	prismaClient.user.update({
		where: { id },
		data: {
			name,
			email,
			phone,
			address,
			password,
			role,
		},
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			address: true,
			role: true,
		},
	})
		.then((updatedUser) =>
			res
				.status(200)
				.json({
					message: "User updated successfully",
					user: updatedUser
				})
		)
		.catch((error) =>
			res
				.status(500)
				.json({ 
					error: error.message 
				}
		));
}