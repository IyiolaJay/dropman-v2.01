import {Request, Response} from "express";
import { AuthService, userLoginService } from "../services/app/auth.service";
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

export const userLogin = async (req: Request, res: Response) => {
try{
    const {email , password} = req.body;
    const user = await userLoginService(email, password);
    return res.status(200).json({
        message : "User logged in",
        user : user.user,
        token : user.token,
    })
}catch(error:any){
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({error :result});
}
};


export const verifyUser = async (req: Request, res:Response)=>{
    try{
        const {token} = req.params;
        const {user} = res.locals;
        await AuthService.verifyUserService(token ?? "", user._id);
        return res.status(200).json({
            message : "User verification successful ",
        })
    }catch(error:any){
        console.log(error);
        const result = getErrorMessage(error);
        return res.status(result.code).json({error :result});
    }
}