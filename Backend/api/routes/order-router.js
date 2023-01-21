import express, { Router } from "express";
import { orderController } from "../controllers/index.js";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.postOrders);

  

export default orderRouter;
