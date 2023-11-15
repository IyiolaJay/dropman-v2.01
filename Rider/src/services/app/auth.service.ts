import Rider from "../../database/rider";
import { IRider } from "../../database/rider/types";
import { ErrEmailAlreadyExists } from "../../errors";
import { genHashedPassword } from "../../utils/auth.utils";

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

export const AuthService = {
    createRiderAccountService,
}