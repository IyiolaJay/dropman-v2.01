import {Request, Response} from "express";
import { getErrorMessage } from "../errors";
import { AuthService } from "../services/app/auth.service";


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