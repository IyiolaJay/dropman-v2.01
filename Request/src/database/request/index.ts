import { IAddressSchema, IDeliveryAddress, IRequest, Status } from "./types";
import { Schema, model } from "mongoose";


const addressSchema = new Schema<IAddressSchema>({
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
});

const deliveryDataSchema = new Schema <IDeliveryAddress>({
    trackingNumber: {
        type: String,
        unique : true,
        required : true,
        default : "",
      },

    address : {
      type : addressSchema,
      require : true,
    },

     recipientName: {
        type: String,
        required : true,
      },

      recipientPhone: {
        type: String,
        require: true,
      },
     
  })
  


const requestSchema = new Schema<IRequest>(
    {
     customerId : {
        type: String,
        required : true,
     },
     rideType : {
        type : String,
        required : true,
     },
     status: {
        type : String,
        enum : Object.values(Status),
        required : true,

     },
     amount : {
        type : String,
        required : true,
     },

     deliveryAddress : {
        type : [deliveryDataSchema],
        required : true,
     },
     pickUpAddress:{

     },
     paid:{
        type: Boolean,
        default : true,
     },
     createdAt : {
        type : Date,
        default : Date.now()
     },


  }

);



const Request = model("Riders", requestSchema);

export default Request;