import {Request, Response} from "express";
import { getErrorMessage } from "../errors";
import { AuthService, userLoginService } from "../services/app/auth.service";


export const createRiderAccount = async (req : Request, res: Response)=>{ 
    try{
        const userReq = req.body;
        await AuthService.createRiderAccountService(userReq);
        
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

export const userLogin = async (req: Request, res: Response) => {
try{
    const {email , password} = req.body;
    const user = await userLoginService(email, password);
    return res.status(200).json({
        message : "User logged in",
        token : user.token,
    })
}catch(error:any){
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(error.code).json({error :result});
}
};