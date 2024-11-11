import { app } from "./app.js";
const PORT = 3000 || process.env.PORT;

app.get("/", (_, response) => {
  response.send({
    message:
      "Welcome to AdoçãoTech API. To see full documentation, please go to /docs.",
  });
});

app.listen(PORT, () => {
  console.log(`API documentation: http://localhost:${PORT}/docs`);
});
