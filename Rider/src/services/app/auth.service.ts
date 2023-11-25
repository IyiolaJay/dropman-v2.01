import Rider from "../../database/rider";
import { IRider } from "../../database/rider/types";
import { ErrEmailAlreadyExists, ErrInvalidPassword, ErrUserNotFound } from "../../errors";
import { comparePassword, genHashedPassword } from "../../utils/auth.utils";
import { generateAuthToken } from "../security/token.service";

const createRiderAccountService = async (userReq : IRider) =>{
    const {email, password} = userReq;

    const rider = 
        Rider.findOne({ email});

    
    if (rider !== null ) throw ErrEmailAlreadyExists;
    

    const hp = await genHashedPassword(password);

    const newCustomer = await Rider.create({
        ...userReq,
        password : hp,
    })  
   
    return newCustomer;
};



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