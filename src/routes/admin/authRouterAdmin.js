import { Router } from "express";
import {
  signIn,
  registerAdmin,
} from "../../controllers/admin/authControllerAdmin.js";
import {
  loginMiddleware,
  registerMiddleware,
} from "../../middlewares/admin/authMiddlewareAdmin.js";

const authRouterAdmin = Router();

authRouterAdmin.post("/admin/sign-in", loginMiddleware, signIn);
authRouterAdmin.post(
  "/admin/register/admin",
  registerMiddleware,
  registerAdmin
);

export default authRouterAdmin;
