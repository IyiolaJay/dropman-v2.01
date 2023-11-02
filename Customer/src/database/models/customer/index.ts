import { ICustomer } from "./types";
import { Schema, model } from "mongoose";
import { v4 as uuidV4} from "uuid";
import { ErrInvalidPassword } from "../../../errors";


const userSchema = new Schema<ICustomer>(
    {
        firstName: {
            type : String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required : true,
        },

        email: {
            type: String,
            required : true,
        },

        imageUrl:{
            type : String,
            default : "",
        },

        phoneNumber: {
            type: String,
            required: true,
        },
       
        
        publicId : {
            type : String,
            required : true,
            unique : true,
            default : ()=> uuidV4(),
        },
        isVerified: {
            type: Boolean,
            default : false,
        },
        otpCode:{
            type: String,
        },


    },
    { timestamps : true}

);

userSchema.pre("save",async function (){
    if(this.isModified("password")){
        throw ErrInvalidPassword;
    }
});

const User = model("Users", userSchema);

export default User;