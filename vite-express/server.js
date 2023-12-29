import express from "express";
import indexRoute from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/", indexRoute);

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
