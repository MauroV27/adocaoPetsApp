import { PrismaClient } from "@prisma/client";
import { PrismockClient } from "prismock";

let prismaClient;

function initializePrisma() {
  if (process.env.NODE_ENV === "test") {
    console.log("Using mock client");
    return new PrismockClient();
  } else {
    return new PrismaClient();
  }
}

prismaClient = initializePrisma();
export { prismaClient };
