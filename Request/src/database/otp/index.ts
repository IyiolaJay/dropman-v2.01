import {Schema, model} from "mongoose";
import { IDeliveryToken } from "./types";

const deliveryTokenSchema = new Schema<IDeliveryToken>({
    
    customerId: {
        type : String,
        required: true,
    },
    
    trackingId:{
        type: String,
        required : true,
    },

    token:{
        type : String,
        required : true,
    },
})

const Token = model("Tokens", deliveryTokenSchema);

export default Token;