import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: 'Enter your username',
        maxlength: [15,'Maximum 15 characters are allowed in username.']
    },
    password: {
        type: String,
        required: 'Enter your password'
    },
    role: {
        type: String,
        required: 'Select your role'
    },
    lastLoginTime: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: "Enter you email",
      },
    userDetailsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    },
    refreshToken:{
        type:String
    },
    resetPasswordLink:{
        type:String,
        default:''
    }

}, {versionKey:false},{ timestamps: true });

userSchema.virtual('id',() => this._id.toHexString());
userSchema.set('toJSON',{virtuals:true});

const userAccountModel = mongoose.model('UserAccounts', userSchema);
export default userAccountModel;
