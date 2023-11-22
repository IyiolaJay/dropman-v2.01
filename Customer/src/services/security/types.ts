import { Types } from "mongoose";

export interface ITokenData {
    _id : Types.ObjectId;
    publicId : string;
}