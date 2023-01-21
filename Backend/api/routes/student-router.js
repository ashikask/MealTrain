import express, { Router } from "express";
import { studentController } from "../controllers/index.js";
import { authenticator } from "../middleware/index.js";

const studentRouter = express.Router();

studentRouter
  .route("/")
  .get(studentController.getStudents)
  .post(studentController.postStudent);
studentRouter
  .route("/:studentId")
  .get(studentController.getOneStudent)
  .put(studentController.updateStudentById)
  .delete(studentController.removeStudentById);
studentRouter
  .route("/:studentId/orders")
  .get(authenticator.verifyToken, studentController.getOrdersByStudentId);
studentRouter
  .route("/:studentId/orders/:orderId")
  .get(studentController.getOrderOfOneStudent)
  .put(studentController.updateOrderId)
  .delete(studentController.removeOrderOfOneStudent);
studentRouter.route("/:studentId/orders/:status").get();

// Place order: cart
studentRouter
  .route("/:studentId/cart")
  .get(studentController.getCartDetail)
  .post(studentController.addTocart)
  .delete(studentController.deleteAllCart);
studentRouter
  .route("/:studentId/cart/:itemId")
  .put(studentController.updateCart)
  .delete(studentController.deleteCart);

//make payment
studentRouter.route("/:studentId/orders/:orderId/makePayment").post();
// notifications
studentRouter.route("/:studentId/notifications").get();

// email
studentRouter.route("/:studentId/sendEmail").post();

export default studentRouter;
