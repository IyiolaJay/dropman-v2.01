import { ICustomer } from "../../database/models/customer/types";
import Customer from "../../database/models/customer/index";
import { ErrEmailAlreadyExists, ErrInvalidPassword, ErrUserNotFound } from "../../errors";
import { comparePassword, genHashedPassword } from "../../utils/auth.utils";
import { publishRiderEvent } from "./events.service";
import { generateAuthToken } from "../security/token.service";



/**
 * @description   Customer account creation
 * @param (userReq)
 * @returns user object
 */
const createUserAccountService = async (userReq : ICustomer) =>{
    const {email, password} = userReq;

    const customer =  await Customer.findOne({ email});

    const res = await publishRiderEvent({payload : {event : "CHECK_RIDER", data : {email : email}}})
    
    console.log(res);
        
    if (customer) throw ErrEmailAlreadyExists;
    

    const hp = await genHashedPassword(password);

    const newCustomer = await Customer.create({
        ...userReq,
        password : hp,
    })  
   
    return newCustomer;
};


/**
 * @description   Customer login
 * @param (userReq)
 * @returns user object
 */
export const userLoginService = async (email : string, password : string)=> {
    
    const findUser  = await Customer.findOne({ email: email });
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
    createUserAccountService,
    userLoginService
}