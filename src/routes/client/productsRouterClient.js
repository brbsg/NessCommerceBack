import { Router } from "express";
import { getAllProducts } from "../../controllers/client/getProductController.js";

const productsRouterClient = Router();

productsRouterClient.get("/products", getAllProducts);

export default productsRouterClient;