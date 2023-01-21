import express, { Router } from "express";
import { userDetailsController } from "../controllers/index.js";
import { authenticator } from "../middleware/index.js";

const userRouter = express.Router();

userRouter.route("/").post(authenticator.verifyToken, userDetailsController.addUserDetails);
userRouter
  .route("/:userId")
  .put(authenticator.verifyToken, userDetailsController.updateUserDetails)
  .get(authenticator.verifyToken, userDetailsController.getUserDetails);

userRouter.route("/:role").get();
// email
userRouter
  .route("/:userId/sendEmail") //(welcome message/resetPassword/orderNotifcation)
  .post(); //common template

export default userRouter;
