import swaggerAutogen from "swagger-autogen";
const swaggerAutogenInstance = swaggerAutogen({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "AdoçãoTech",
    description: "API para gerenciar o processo de adoção de animais.",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "Endpoints related to users",
    },
    {
      name: "Pets",
      description: "Endpoints related to pets",
    },
    {
      name: "Adopt",
      description: "Endpoints related to adoptions.",
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  definitions: {
    Pet: {
      type: "object",
      properties: {
        name: { type: "string", example: "Rex" },
        specie: { type: "string", example: "Dog" },
        breed: { type: "string", example: "Labrador" },
        gender: {
          type: "string",
          enum: ["AVAILABLE", "ADOPTED", "INPROCESS"],
          example: "AVAILABLE",
        },
        dob: { type: "string", example: "2019-01-01" },
        description: { type: "string", example: "Friendly and playful" },
        size: {
          type: "string",
          enum: ["UNDEFINED", "SMALL", "MEDIUM", "BIGGER"],
          example: "MEDIUM",
        },
        personality: { type: "string", example: "Playful and loving" },
      },
      required: [
        "name",
        "specie",
        "breed",
        "gender",
        "dob",
        "description",
        "size",
        "personality",
      ],
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = [
  "./routes/userRoutes.js",
  "./routes/petsRoutes.js",
];

swaggerAutogenInstance(outputFile, routes, doc).then(async () => {
  await import("./server.js");
});
