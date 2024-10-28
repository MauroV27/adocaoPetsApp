import express from "express";

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (_, response) => {
  response.send({
    message:
      "Welcome to AdoçãoTech API. To see full documentation, please go to /documentation.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
