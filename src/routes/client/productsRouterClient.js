import { Router } from "express";
import {
  getAllProducts,
  getCart,
  getProduct,
  postCart,
  postConfirmBuy,
} from "../../controllers/client/getProductController.js";

const productsRouterClient = Router();

productsRouterClient.get("/products", getAllProducts);
productsRouterClient.get("/products/:productId", getProduct);
productsRouterClient.get("/cart", getCart);
productsRouterClient.post("/cart/:productId", postCart);
productsRouterClient.post("/confirm-buy", postConfirmBuy);

export default productsRouterClient;
