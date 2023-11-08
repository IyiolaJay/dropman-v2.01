import { IPayload } from "./types";


//Todo implement event hook feature
export const subscribeEvent = async (payloads: IPayload)=>{
    const {payload} = payloads;

    const {event} = payload;
    switch(event){
        case "CHECK_RIDER":
        return  "Actions Implementation";
        default:
            break;
    }
    return;
};