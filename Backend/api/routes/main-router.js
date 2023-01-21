import express from "express";
import authRouter from "./auth-router.js";
import userRouter from "./user-router.js";
import studentRouter from "./student-router.js";
import providerRouter from "./provider-router.js";
import orderRouter from "./order-router.js";
import utilRouter from "./util-router.js";
const mainRouter = express.Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/students", studentRouter);
mainRouter.use("/providers", providerRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/util", utilRouter);
export default mainRouter;
