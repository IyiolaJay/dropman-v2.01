import { Router } from "express";
import { createUserAccount, userLogin } from "../controllers/auth.controller";
import { validateRequest } from "../utils/api.utils";
import { signInValidator, signUpValidator } from "../middlewares/validators/auth.validator";

const route = Router();

route.post("/create", validateRequest(signUpValidator),createUserAccount);
route.post("/login", validateRequest(signInValidator), userLogin)

export default route;