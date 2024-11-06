let prismaClient;

async function initializePrisma() {
  if (process.env.NODE_ENV === "test") {
    return await import("prismock").then( mod => {
            return new mod.PrismockClient();
        });
  } else {
    return await import("@prisma/client").then((mod) => {
      return new mod.PrismaClient();
    });
  }
}

prismaClient = initializePrisma();
export { prismaClient };
