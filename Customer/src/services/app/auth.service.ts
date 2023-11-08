import { ICustomer } from "../../database/models/customer/types";
import Customer from "../../database/models/customer/index";
import { ErrEmailAlreadyExists } from "../../errors";
import { genHashedPassword } from "../../utils/auth.utils";
import { publishRiderEvent } from "./events.service";



/**
 * @description   Customer account creation
 * @param (userReq)
 * @returns user object
 */
const createUserAccountService = async (userReq : ICustomer) =>{
    const {email, password} = userReq;

    const customer = 
        Customer.findOne({ email});

    const res = await publishRiderEvent({payload : {event : "CHECK_RIDER", data : {email : email}}})
    
    console.log(res);

    
    if (customer !== null ) throw ErrEmailAlreadyExists;
    

    const hp = await genHashedPassword(password);

    const newCustomer = await Customer.create({
        ...userReq,
        password : hp,
    })  
   
    return newCustomer;
};

export const AuthService = {
    createUserAccountService,
}