import { app } from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API documentation: http://localhost:${PORT}/docs`);
});
