import { Router } from "express";
import { signIn } from "../../controllers/admin/authControllerAdmin.js";

const authRouterAdmin = Router();

authRouterAdmin.post("/sign-in", signIn);

export default authRouterAdmin;
