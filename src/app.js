import express, { json } from "express";
import cors from "cors";

import authRouterAdmin from "./routes/admin/authRouterAdmin.js";
import productsRouterAdmin from "./routes/admin/productsRouterAdmin.js";

const app = express();

app.use(cors());
app.use(json());

app.use(authRouterAdmin);
app.use(productsRouterAdmin);

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
