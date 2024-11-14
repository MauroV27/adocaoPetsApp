import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

export { app };
