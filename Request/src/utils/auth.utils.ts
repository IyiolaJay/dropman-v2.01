import bcrypt from "bcrypt";

export const genHashedPassword = async (password : string) => {
    const newPassword  = await bcrypt.hash(password, 12);
    return newPassword;
}

export const comparePassword = async (enteredPassword : string, password : string) =>{
    const isValid = await bcrypt.compare(enteredPassword, password);
    return isValid;
}
