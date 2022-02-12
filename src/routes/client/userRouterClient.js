import { Router } from "express";
import { getClient, postConfirmBuy } from "../../controllers/client/userControllerClient.js";

const userRouterClient = Router();

userRouterClient.get("/user", getClient);
userRouterClient.post("/confirm-buy", postConfirmBuy);

export default userRouterClient;