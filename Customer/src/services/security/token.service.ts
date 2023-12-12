import * as jwt from "jsonwebtoken";
import { ITokenData } from "./types";

export const generateAuthToken = async (payload: ITokenData) => {
  return jwt.sign(payload, process.env.CUSTOMER_JWT_SECRET!);
};

export const verifyAuthToken = async (token: string) => {
  const isValid = jwt.verify(token, process.env.CUSTOMER_JWT_SECRET!);
  return isValid as ITokenData;
};
