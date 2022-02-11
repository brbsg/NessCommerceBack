import { Router } from "express";
import { signUpClient, signInClient } from "../../controllers/client/authControllerClient.js";

const authRouterClient = Router();

authRouterClient.post("/client/register", signUpClient);
authRouterClient.post("/client/login", signInClient);

export default authRouterClient;
