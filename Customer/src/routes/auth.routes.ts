import { Router } from "express";
import { createUserAccount } from "../controllers/auth.controller";
import { validateRequest } from "../utils/api.utils";
import { signUpValidator } from "../middlewares/validators/auth.validator";

const route = Router();

route.post("/create", validateRequest(signUpValidator),createUserAccount);


export default route;