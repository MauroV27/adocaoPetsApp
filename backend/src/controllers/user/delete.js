import { prismaClient } from "../../database/prismaClient.js";

export async function deleteUser(req, res) {
    const { id } = req.params;
  
    await prismaClient.user.delete({
        where: { id },
      })
      .then(() => 
        res
            .status(204)
            .json({ 
                message: "User deleted successfully" 
            }
        ))
      .catch((error) => 
        res
            .status(500)
            .json({ 
                error: error.message 
            }
        ));
  }