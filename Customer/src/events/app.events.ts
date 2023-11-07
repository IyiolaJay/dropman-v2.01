import { IPayload } from "./types";


//Todo implement event feature
export const subscribeEvent = async (payload: IPayload)=>{
    const {event  } = payload;

    switch(event){
        case "CHECK_USER":
        return  "Actions Implementation";
        default:
            break;
    }
    return;
};