import { Router } from "express";
import {
  signUpClient,
  signInClient,
} from "../../controllers/client/authControllerClient.js";
import {
  loginMiddleware,
  registerMiddleware,
} from "../../middlewares/admin/authMiddlewareAdmin.js";
const authRouterClient = Router();

authRouterClient.post("/client/register", registerMiddleware, signUpClient);
authRouterClient.post("/client/login", loginMiddleware, signInClient);

export default authRouterClient;
