import { Router } from "express";
import { getAllProducts, getProduct } from "../../controllers/client/getProductController.js";

const productsRouterClient = Router();

productsRouterClient.get("/products", getAllProducts);
productsRouterClient.get("/products/:whatproduct", getProduct);

export default productsRouterClient;