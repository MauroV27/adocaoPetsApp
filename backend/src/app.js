import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";

// TODO adicionar corsOptions
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

export { app };
