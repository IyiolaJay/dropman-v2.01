import Rider from "../../database/rider";
import { IRider } from "../../database/rider/types";
import { ErrEmailAlreadyExists, ErrInvalidPassword, ErrUserNotFound } from "../../errors";
import { generateOTP } from "../../utils/api.utils";
import { comparePassword, genHashedPassword } from "../../utils/auth.utils";
import { sendToMail } from "../email/email.service";
import { generateAuthToken } from "../security/token.service";



/**
 * @description   Rider account creation
 * @param (userReq)
 * @returns user object
 */
const createRiderAccountService = async (userReq : IRider) =>{
    const {email, password, firstName} = userReq;

    const rider = 
        Rider.findOne({ email});

    
    if (rider !== null ) throw ErrEmailAlreadyExists;
    

    const hp = await genHashedPassword(password);
    const token = await generateOTP();


    const newCustomer = await Rider.create({
        ...userReq,
        password : hp,
        otpCode :token,
    })  
    const mailBody = {
        to : email,
        subject : "Welcome to Dropman",
        name : firstName,
        token : token 
    }
    await sendToMail(mailBody)
    return newCustomer;
};


/**
 * @description   Rider login
 * @param (email & password )
 * @returns user object & Token
 */
export const userLoginService = async (email : string, password : string)=> {
    
    const findUser  = await Rider.findOne({ email: email });
    if (!findUser) throw ErrUserNotFound;

    const passwordCompare = comparePassword(password, findUser.password);
    if (!passwordCompare) throw ErrInvalidPassword;

    const payload =  {
        _id : findUser._id,
        publicId : findUser.publicId,
    }

    const token = await generateAuthToken(payload);

    return { findUser, token};
}

export const AuthService = {
    createRiderAccountService,
    userLoginService
}