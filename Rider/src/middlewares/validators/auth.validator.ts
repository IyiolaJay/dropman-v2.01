import Joi from "joi";


export const signUpValidator = Joi.object({
    
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email : Joi.string().email().required(),
    password:Joi.string().min(6).max(100).required(),
    phoneNumber : Joi.string().custom((value, helpers) => {

        const sanitizedPhoneNumber = value.replace(/^0/, '+234');
    
        if (!/^(\+234\d{10}|\d{11})$/.test(sanitizedPhoneNumber)) {
          return helpers.error('phoneNumber.invalid');
        }
    
        return sanitizedPhoneNumber;
      }, 'Custom phone number validation').required(),
})