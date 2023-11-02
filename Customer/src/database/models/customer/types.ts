import { Types } from "mongoose";

export interface ICustomer {
  _id: Types.ObjectId;
  publicId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isVerified: boolean;
  imageUrl?: string;
  otpCode?: string;
}

