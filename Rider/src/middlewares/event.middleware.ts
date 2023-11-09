import { Request, Response } from "express";
// import { subscribeEvent } from "../events/app.events";
// import { IPayload } from "../events/types";
import { getErrorMessage } from "../errors";
import {Express} from "express";

export const riderEvent= (app : Express)=>{
    
    
    app.use("/app-events",  async (req: Request, res: Response) => {
        try {
        const { payload } = req.body;
    
        //  await subscribeEvent(payload as IPayload);
    
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