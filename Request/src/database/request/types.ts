import { Date, Types } from "mongoose";

export interface IRequest {
  _id : Types.ObjectId;
  customerId : string;
  rideType : string;
  riderId? : Types.ObjectId;
  status : Status;
  amount : string;
  deliveryAddress : IDeliveryAddress[];
  pickUpAddress : string;
  paid : boolean;
  createdAt : Date;
}


export interface IDeliveryAddress {
  trackingNumber: string;
  address : IAddressSchema;
  recipientName: string;
  recipientPhone: string;
}


export interface IAddressSchema{
  type: string;
  coordinates : number[];
}

export enum Status{
  Requested = "requested",
  Transit = "transit",
  Delivered = "delivered",
  Failed = "failed",
  Retrying = "retrying",
}
