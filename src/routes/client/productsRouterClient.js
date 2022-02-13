import { Router } from "express";
import {
  getAllProducts,
  getCart,
  getProduct,
  postCart,
} from "../../controllers/client/getProductController.js";

const productsRouterClient = Router();

productsRouterClient.get("/products", getAllProducts);
productsRouterClient.get("/products/:productId", getProduct);
productsRouterClient.get("/cart", getCart);
productsRouterClient.post("/cart/:productId", postCart);

export default productsRouterClient;
