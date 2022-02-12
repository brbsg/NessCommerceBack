import { Router } from "express";
import {
  getAllProducts,
  getProduct,
} from "../../controllers/client/getProductController.js";

const productsRouterClient = Router();

productsRouterClient.get("/products", getAllProducts);
productsRouterClient.get("/products/:idProduct", getProduct);
productsRouterClient.get("/products/cart", getProduct);
productsRouterClient.post("/products/cart/:idProduct", getProduct);

export default productsRouterClient;
