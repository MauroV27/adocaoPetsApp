import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./swagger-output.json" assert { type: "json" };


const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API documentation: http://localhost:${PORT}/docs`);
});
