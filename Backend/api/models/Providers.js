import mongoose from "mongoose";

const providersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name is a required field",
  },
  shortDescription:{
    type:String,
    required:"Enter your company's short description",
  },
  description:{
    type:String,
    required:"Enter your description"
  },

  businessImage: {
    type: String,
    required: "Please upload the Business image",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],

  minOfferingPrice: {
    type: Number,
    required: "Minimum Offering Price is Required",
    default:0
  },

  offerings: [
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
    },
  ],
  rating: {
    type: Number,
    default: null,
  },
});

const providersModel = mongoose.model("providers", providersSchema);
export default providersModel;
