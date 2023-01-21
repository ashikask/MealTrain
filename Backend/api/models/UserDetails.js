import mongoose from "mongoose";


const userDetailsSchema = new mongoose.Schema(
  {
    firstname: {
      //shop name for provider
      type: String,
      required: "Enter your firstname",
      maxlength: [20,'Maximum 20 characters are allowed in firstname.']
    },
    lastname: {
      //owner name for provider
      type: String,
      required: "Enter your lastname",
      maxlength: [20,'Maximum 20 characters are allowed in firstname.']
    },
    phoneNumber: {
      type: String,
      required: "Enter you phone number",
      // maxlength: [15,'Maximum 15 digits are allowed in phone number.']

    },
    address: {
      streetName: {
        type: String,
        required: "Enter you street name",
        maxlength: [40,'Maximum 40 characters are allowed in street name.']
        
      },
      aptNo: {
        type: String,
        required: "Enter your apartment number",
        maxlength: [20,'Maximum 20 characters are allowed in apartment Number.']
      },
      zipcode:{
        type:String,
        required:"Enter your zip code",
        // maxlength: [6,'Maximum 6 characters are allowed in zip code.'],
      },
      city:{
        type:String,
        required:"Enter your city name",
        maxlength: [20,'Maximum 20 characters are allowed in city name.']

      },
      state:{
        type:String,
        required:"Enter your state name",
        maxlength: [20,'Maximum 20 characters are allowed in state name.']

      }
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      default: null,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Providers",
      default: null,
    },
  },
  { skipVersioning: true, timestamps: true }

);


userDetailsSchema.virtual('id',() => this._id.toHexString());
userDetailsSchema.set('toJSON',{virtuals:true});

const userDetailsModel = mongoose.model("UserDetails", userDetailsSchema);
export default userDetailsModel;
