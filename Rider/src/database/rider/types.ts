import { Types } from "mongoose";

export interface IRider {
  _id: Types.ObjectId;
  publicId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
  address: string;
  isVerified: boolean;
  imageUrl?: string;
  otpCode: string;
  metaData?: object;
}
