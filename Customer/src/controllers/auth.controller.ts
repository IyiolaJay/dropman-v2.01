import {Request, Response} from "express";
import { AuthService } from "../services/app/auth.service";
import { getErrorMessage } from "../errors";



export const createUserAccount = async (req : Request, res: Response)=>{ 
try{
    const userReq = req.body;
    await AuthService.createUserAccountService(userReq);
    
    res.status(201).json({
        message : "Account created",
    })
    return;
}
catch(error: any){
    console.log(error);
    const result = getErrorMessage(error);
    res.status(result.code).json({error : result});
    return;
}

}