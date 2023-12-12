import { ICustomer } from "../../database/models/customer/types";
import Customer from "../../database/models/customer/index";
import {
  ErrEmailAlreadyExists,
  ErrInvalidPassword,
  ErrUserNotFound,
} from "../../errors";
import { comparePassword, genHashedPassword } from "../../utils/auth.utils";
import { publishRiderEvent } from "./events.service";
import { generateAuthToken } from "../security/token.service";
import { sendToMail } from "../email/email.service";
import { generateOTP } from "../../utils/api.utils";

/**
 * @description   Customer account creation
 * @param (userReq)
 * @returns user object
 */
const createUserAccountService = async (userReq: ICustomer) => {
  const { email, password, firstName } = userReq;

  const customer = await Customer.findOne({ email });

  //@TODO check if email exists on rider's database
  const res = await publishRiderEvent({
    payload: { event: "CHECK_RIDER", data: { email: email } },
  });

  console.log(res);

  if (customer) throw ErrEmailAlreadyExists;

  const hp = await genHashedPassword(password);
  const token = await generateOTP();

  const newCustomer = await Customer.create({
    ...userReq,
    password: hp,
    otpCode: token,
  });

  const mailBody = {
    to: email,
    subject: "Welcome to Dropman",
    name: firstName,
    token: token,
  };
  await sendToMail(mailBody);
  return newCustomer;
};

/**
 * @description   Customer login
 * @param (email & password )
 * @returns user object & Token
 */
export const userLoginService = async (email: string, password: string) => {
  const user = await Customer.findOne({ email: email });
  if (!user) throw ErrUserNotFound;

  const passwordCompare = comparePassword(password, user.password);
  if (!passwordCompare) throw ErrInvalidPassword;

  const payload = {
    _id: user._id,
    publicId: user.publicId,
  };

  const token = await generateAuthToken(payload);
 

  return { user, token };
};

/**
 * @description   Verify Account
 * @param (token & userId )
 * @returns null
 */
const verifyUserService = async (token: string, userId: string) => {
  const user = await Customer.findOneAndUpdate(
    { otpCode: token, _id: userId },
    { $set: { isVerified: true }, $unset: { otpCode: 1 } },
    { new: true }
  );
  if(!user) throw ErrUserNotFound;
  return;
};

export const AuthService = {
  createUserAccountService,
  userLoginService,
  verifyUserService,
};
