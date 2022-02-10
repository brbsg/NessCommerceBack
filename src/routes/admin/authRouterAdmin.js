import { Router } from "express";
import {
  signIn,
  registerAdmin,
} from "../../controllers/admin/authControllerAdmin.js";

const authRouterAdmin = Router();

authRouterAdmin.post("/admin/sign-in", signIn);
authRouterAdmin.post("/admin/register", registerAdmin);

export default authRouterAdmin;
