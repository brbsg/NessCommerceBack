import { Router } from "express";
import {
  signIn,
  registerAdmin,
} from "../../controllers/admin/authControllerAdmin.js";
import adminMiddleware from "../../middlewares/admin/authMiddlewareAdmin.js";

const authRouterAdmin = Router();

authRouterAdmin.post("/admin/sign-in", adminMiddleware, signIn);
authRouterAdmin.post("/admin/register", adminMiddleware, registerAdmin);

export default authRouterAdmin;
