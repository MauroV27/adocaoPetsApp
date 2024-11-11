import { compare, hash } from "../security/crypt.js";
import { createJWTToken } from "../security/jwt-middleware.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function create(req, res) {
  // TODO : add validation to req.body data
  const { name, email, phone, address, password } = req.body;
  const hashedPassword = await hash(password, 10);

  const response = await prismaClient.user
    .create({
      data: {
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
      },
    })
    .then((user) => {
      return res.status(201).json({
        message: "User created successfully",
        user: user,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });

  return response;
}

export async function login(req, res) {
  // TODO : add validation to req.body data
  const { email, password } = req.body;

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Login failed, invalid credentials." });
  }

  // Comparar a senha fornecida com a senha hash armazenada
  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Login failed, invalid credentials." });
  }

  const createUserToken = createJWTToken({ id: user.id });
  res.cookie("jwt_token", createUserToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 60 * 60 * 1000,
  });
  // Login bem-sucedido
  return res
    .status(200)
    .json({
      success: true,
      message: "Login successfully",
      token: createUserToken,
    });
}

export async function getById(req, res) {
  const userId = req.params.id;
  const { id } = req.user;
  const { access } = req;
  if (access != "ADMIN" && id != userId) {
    return res.status(403).json({
      message: "Unauthorized access",
    });
  }

  const response = await prismaClient.user
    .findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
        role: true,
        Adoption: true,
      },
    })
    .then((user) => {
      return res.status(201).json({
        data: user,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });

  return response;
}

export async function promoteUserToAdmin(req, res) {
  // Validate request body
  const { promoteId } = req.body;

  // 1, Get user account by JWT auth if user.role == ADMIN
  const currentUser = req.user;

  // 2. Try to convert user with promoteId in ADMIN
  //  2.1 If promoteId is a valid user, so promote to ADMIN
  //  2.2 If promoteId not is a valid user, so retunr user not found to promote in ADMIN
  const userToPromote = await prismaClient.user.findUnique({
    where: { id: promoteId },
  });

  if (!userToPromote) {
    return res.status(404).json({ error: "User to promote not found" });
  }

  // 3. Promote the user to ADMIN
  const updatedUserResponse = await prismaClient.user
    .update({
      where: { id: promoteId },
      data: { role: "ADMIN" },
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

  // TODO esse return é funcional?
  return updatedUserResponse;
}

export function getAll(req, res) {
  const { limit = 10, offset = 0 } = req.query;

  prismaClient.user
    .findMany({
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
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error: error.message }));
}

export function update(req, res) {
  const { id } = req.params;
  const { name, email, phone, address, password, role } = req.body;

  prismaClient.user
    .update({
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
        .json({ message: "User updated successfully", user: updatedUser })
    )
    .catch((error) => res.status(500).json({ error: error.message }));
}

export function deleteUser(req, res) {
  const { id } = req.params;

  prismaClient.user
    .delete({
      where: { id },
    })
    .then(() => res.status(204).json({ message: "User deleted successfully" }))
    .catch((error) => res.status(500).json({ error: error.message }));
}
