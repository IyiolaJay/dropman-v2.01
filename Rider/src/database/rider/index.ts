import { IRider } from "./types";
import { Schema, model } from "mongoose";
import { v4 as uuidV4} from "uuid";
import { ErrInvalidPassword } from "../../errors";


const riderSchema = new Schema<IRider>(
    {
        firstName: {
            type : String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required : true,
        },

        password: {
            type: String,
            required : true,
        },
        imageUrl:{
            type : String,
            default : "",
        },
        
        address: {
            type : String,
            required : true,
        },

        gender : {
            type:String,
            require: true,
            enum: ["male", "female"]
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

riderSchema.pre("save",async function (){
    if(this.isModified("password")){
        throw ErrInvalidPassword;
    }
});

const Rider = model("Riders", riderSchema);

export default Rider;