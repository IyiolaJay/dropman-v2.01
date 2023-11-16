import axios from "axios";

//communicates with the rider services
export const publishRiderEvent =async (payload :any)=>{

    if(!payload){
        throw new Error("Payload is required");
    }
    const response = await axios.post("http://localhost:5003/app-events", payload);

    return response.data;

}