import express, { json, Router } from "express";
import cors from "cors";

import authRouterAdmin from "./routes/admin/authRouterAdmin.js";
import productsRouterAdmin from "./routes/admin/productsRouterAdmin.js";

const app = express();
app.use(cors());
app.use(json());

const router = Router();
router.use(authRouterAdmin);
router.use(productsRouterAdmin);

app.use(router);

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
