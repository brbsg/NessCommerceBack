import express, { json } from "express";
import cors from "cors";

import authRouterAdmin from "./routes/admin/authRouterAdmin.js";
import authRouterClient from "./routes/client/authRouterClient.js";

const app = express();
app.use(cors());
app.use(json());

app.use(authRouterAdmin);
app.use(authRouterClient);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
