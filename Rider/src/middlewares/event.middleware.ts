import { Request, Response } from "express";
import { getErrorMessage } from "../errors";
import {Express} from "express";

export const riderEvent= (app : Express)=>{
    
    
    app.use("/app-events",  async (req: Request, res: Response) => {
        try {
        const { payload } = req.body;
    
    
        res.status(200).json({
          data : payload,
        });
        return;
      } catch (error: any) {
        const err = getErrorMessage(error);
        res.status(err.code).json({
            error : err
        })
      }
    });
   
}