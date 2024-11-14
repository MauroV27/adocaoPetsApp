import { prismaClient } from "../../database/prismaClient.js";

export async function promoteUserToAdmin(req, res) {
    // Validate request body
    const { promoteId } = req.body;
  
    // 1. Try to convert user with promoteId in ADMIN
    //  1.1 If promoteId is a valid user, so promote to ADMIN
    //  1.2 If promoteId not is a valid user, so retunr user not found to promote in ADMIN
    const userToPromote = await prismaClient.user.findUnique({
      where: { id: promoteId },
    });
  
    if (!userToPromote) {
      return res.status(404).json({ message: "User to promote not found", error: true });
    }
  
    // 2. Promote the user to ADMIN
    await prismaClient.user.update({
        where: { 
            id: promoteId 
        },
        data: { 
            role: "ADMIN" 
        },
        select: {
          id: true,
          role: true,
          name: true,
        },
      })
      .then((user) => {
        return res.json({ message: "User promoted successfully", user });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      });
  }