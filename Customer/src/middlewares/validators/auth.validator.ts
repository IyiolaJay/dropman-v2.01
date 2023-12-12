import Joi from "joi";


export const signUpValidator = Joi.object({
    
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email : Joi.string().email().required(),
    password:Joi.string().min(6).max(100).required(),
    phoneNumber : Joi.string().min(8).required(),
})


export const signInValidator = Joi.object({
  email : Joi.string().email().required(),
  password:Joi.string().min(6).max(100).required(),
})
