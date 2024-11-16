import { PrismaClient } from "@prisma/client";
import { PrismockClient } from "prismock";

function initializePrisma() {
  if (process.env.NODE_ENV === "test") {
    return new PrismockClient();
  } else {
    return new PrismaClient();
  }
}
const prismaClient = initializePrisma();
export { prismaClient };
