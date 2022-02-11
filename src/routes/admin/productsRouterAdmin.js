import { Router } from "express";
import { registerProducts } from "../../controllers/admin/productsControllerAdmin.js";
import productMiddleware from "../../middlewares/admin/productsMiddlewareAdmin.js";
const productsRouterAdmin = Router();

productsRouterAdmin.post(
  "/admin/register/product",
  productMiddleware,
  registerProducts
);

export default productsRouterAdmin;
