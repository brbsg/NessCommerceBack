import { Router } from "express";
import { getClient } from "../../controllers/client/userControllerClient";

const userRouterClient = Router();

userRouterClient.get("/user", getClient);

export default userRouterClient;