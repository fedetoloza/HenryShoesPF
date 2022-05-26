import { Router } from "express";
import {
  getOrder,
  createOrder,
  getStock,
  HandleStock
} from "../controllers/orders.controller.js";

const router = Router();

router.get("/orders", getOrder);
router.post("/orders", createOrder);
router.get("/stock", getStock);
router.post("/stock", HandleStock);

export default router;