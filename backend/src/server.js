import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

import routes from "./routes/routes.js";

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (_, response) => {
  response.send({
    message:
      "Welcome to AdoçãoTech API. To see full documentation, please go to /documentation.",
  });
});

app.listen(PORT, () => {
  console.log(`API documentation: http://localhost:${PORT}/docs`);
});
