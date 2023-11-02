import { IError } from "./types";



//400
export const ErrInvalidEmail = new Error("Invalid email");
export const ErrInvalidPassword = new Error("Invalid Password");
export const ErrInvalidUserToken = new Error("Invalid user token");
export const ErrTokenIsRequired = new Error("User auth token is required");


//422
export const ErrEmailAlreadyExists = new Error("Email already exists");


//404
export const ErrResourceNotFound = new Error("Resource not found");
export const ErrUserNotFound = new Error("No user found");

//401
export const ErrUnauthorized = new Error("User not authorized");

//406
export const ErrIncompleteFields = new Error("Missing key fields");

//500
export const ErrInternalServer = new Error("Internal server error");


export const getErrorMessage = (error : Error): IError => {
    let message : string = error.toString().replace("Error: ", "");
    let code : number = 0;

    switch(error){
        case  ErrInvalidEmail:
        case ErrInvalidPassword:
        case ErrInvalidUserToken:
        case ErrTokenIsRequired:
            code = 400;
            break;
        
        case ErrUnauthorized:
            code = 401;
            break;

        case ErrResourceNotFound:
        case ErrUserNotFound:
            code = 404;
            break;

        case ErrIncompleteFields:
            code = 406;
            break;

        case ErrInternalServer:
            code = 500;
            break;
        
        default:
            code = 500;
            break;
    }
    const result: IError = {
        code,
        message,
    }

    return result;
}
