import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    // NEW, ORDER_ACCEPTED, ORDER_PROCESSING, ORDER_COMPLETE, DELIVERED
    status: {
      type: String,
      required: "status is required",
    },
    providerName: {
      type: String,
      required: "Name is required",
    },
    providerImage: {
      type: String,
      required: "providerImage is required",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Providers",
    },
    paymentMethod: {
      type: String,
      required: "Payment Method is required",
    },
    orderPlacedDate: {
      type: Date,
      required: "order placed date",
    },
    orderItems: [
      {
        _id: {
          type: String,
        },
        offeringImage: {
          type: String,
          required: "Please upload the offering image",
        },
        cuisineType: {
          type: String,
          required: "Please select the cuisine type",
        },
        offeringType: {
          type: String,
          required: "Please select the offering type",
        },
        offeredAt: {
          type: String,
          required: "Eat time should be required",
        },
        offeringName: {
          type: String,
          required: "Eat time should be required",
        },
        offeringDescription: {
          type: String,
          required: "offering Description should be required",
        },
        offeringPrice: {
          type: Number,
          required: "price should be required",
        },
        offeringQuantity: {
          type: Number,
          required: "Offering Quantity should be required",
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: "Total Price is required",
    },
    orderSummary: [
      {
        stausHistory: {
          type: String,
          required: "status is required",
        },
        orderUpdatedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { skipVersioning: true, timestamps: true }
);

const ordersModel = mongoose.model("orders", ordersSchema);
export default ordersModel;
