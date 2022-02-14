import { Router } from "express";
import {
  getAllProducts,
  getCart,
  getProduct,
  postCart,
  postRemovefromCart,
  postConfirmBuy,
} from "../../controllers/client/getProductController.js";

const productsRouterClient = Router();

productsRouterClient.get("/products", getAllProducts);
productsRouterClient.get("/products/:productId", getProduct);
productsRouterClient.get("/cart", getCart);
productsRouterClient.post("/cart/:productId", postCart);
productsRouterClient.post("/remove-from-cart/:productId", postRemovefromCart);
productsRouterClient.post("/confirm-buy", postConfirmBuy);

export default productsRouterClient;
