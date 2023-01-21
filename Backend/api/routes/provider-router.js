import express, { Router } from "express";
import { providerController } from "../controllers/index.js";
import { authenticator } from "../middleware/index.js";
const providerRouter = express.Router();

providerRouter
  .route("/")
  .get(authenticator.verifyToken,providerController.getProviders)
  .post(providerController.postProviders);
providerRouter
  .route("/:providerId")
  .get(providerController.getOneProvider)
  .put(providerController.updateOneProvider)
  .delete(providerController.removeProvider);

providerRouter.route("/:providerId/orders/").get(providerController.getOrder);

providerRouter
  .route("/:providerId/orders/:orderId")
  .get(providerController.getOneOrder)
  .put(providerController.updateOneOrder);

//delete is a common opration for order (student and provider will be affected by this so, must be added in order-controller)
//.delete(providerController.deleteOneOrder);

//status can be read from the order received in the front end no need a seperate request
// providerRouter.route("/:providerId/orders/:status").get();

providerRouter
  .route("/:providerId/offerings")
  .get(authenticator.verifyToken,providerController.getOffering)
  .post(authenticator.verifyToken,providerController.postOffering)
  .delete(authenticator.verifyToken,providerController.deleteOffering);

providerRouter
  .route("/:providerId/offerings/:offeringId")
  .put(authenticator.verifyToken,providerController.updateOneOffering);

// filtering routes
providerRouter.route("/filterBy/offerings/:cuisineType").get();
providerRouter.route("/filterBy/offerings/:offeredAt").get();
providerRouter.route("/sortBy/offerings/minOfferingPrice").get();
providerRouter.route("/sortBy/rating").get();

//update payment details
providerRouter.route("/:providerId/orders/:orderId/updatePaymentStatus").post();

// notifications
providerRouter.route("/:providerId/notifications").get();
// email
providerRouter.route("/:providerId/sendEmail").post(providerController.sendEmail);

export default providerRouter;
