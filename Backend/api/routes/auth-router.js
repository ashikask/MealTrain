import express, { Router } from 'express';
import { authController } from '../controllers/index.js';
const authRouter= express.Router();
import {authenticator} from '../middleware/index.js';


authRouter.route('/signup').post(authController.registerUser);
authRouter.route('/signin').post(authController.login);
authRouter.route('/forget-password').post(authController.forgetPassword);
authRouter.route('/resetPassword/:id').put(authenticator.verifyResetPasswordToken,authController.resetPassword)
authRouter.route('/signout').delete(authenticator.verifyToken,authController.logOut);
authRouter.route('/refreshToken').get(authController.refreshToken);


export default authRouter;