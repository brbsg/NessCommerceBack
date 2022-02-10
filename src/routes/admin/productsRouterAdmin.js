import { Router } from "express";
import { registerProducts } from "../../controllers/admin/productsControllerAdmin.js";

const productsRouterAdmin = Router();

productsRouterAdmin.post("/admin/product/register", registerProducts);

export default productsRouterAdmin;
