import express, { json } from "express";
import cors from "cors";
import { Router } from "express";

import authRouterAdmin from "./routes/admin/authRouterAdmin.js";

const app = express();
app.use(cors());
app.use(json());

const router = Router();
router.use(authRouterAdmin);

app.get("/", (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
