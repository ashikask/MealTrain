import { strict } from "assert";
import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "name is a required field",
    },
    image: {
      type: String,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
      },
    ],
    expense: {},
    cart: [
      {
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
        cartProviderId: {
          type: String,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: "Total Price is required",
      default: 0,
    },
  },
  { skipVersioning: true, timestamps: true }
);

const studentsModel = mongoose.model("Students", studentsSchema);
export default studentsModel;
