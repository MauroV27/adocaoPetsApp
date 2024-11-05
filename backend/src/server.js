import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API documentation: http://localhost:${PORT}`);
});
