import express, { json } from "express";
import cors from "cors";

import authRouterAdmin from "./routes/admin/authRouterAdmin.js";
import authRouterClient from "./routes/client/authRouterClient.js";
import productsRouterClient from "./routes/client/productsRouterClient.js";
import userRouterClient from "./routes/client/userRouterClient.js";
import productsRouterAdmin from "./routes/admin/productsRouterAdmin.js";

const app = express();

app.use(cors());
app.use(json());

app.use(authRouterAdmin);
app.use(productsRouterAdmin);

app.use(authRouterClient);
app.use(productsRouterClient);
app.use(userRouterClient);

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
